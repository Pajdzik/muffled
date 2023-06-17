import browser from "webextension-polyfill";

import { type LibrarySummary } from "./libraryTypes.js";
import { logDebug, logError, logWarn } from "./debug.js";

const runsInAddon = (): boolean => typeof window === "undefined" || window.browser == null;
const LIBRARY_KEY = "aulibby";

const logErrorMessage = (error: unknown): void => {
  const message = error instanceof Error ? error.message : JSON.stringify(e);
  logError(`Error saving library: ${message}`);
};

export const saveLibrary = async (library: LibrarySummary): Promise<void> => {
  try {
    logDebug(`Saving library: ${library.name}`);

    if (runsInAddon()) {
      logDebug("Saving library in addon");
      await browser.storage.sync.set({ [LIBRARY_KEY]: library });

      if (browser.runtime.lastError != null) {
        throw new Error(browser.runtime.lastError.message ?? "Unknown error");
      }
    } else {
      logWarn("Saving library in local storage");
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
    }

    logDebug("Library saved");
  } catch (e) {
    logErrorMessage(e);
  }
};

export const loadLibrary = async (): Promise<LibrarySummary | undefined> => {
  try {
    logDebug("Loading library");
    let library: LibrarySummary | undefined;

    if (runsInAddon()) {
      logDebug("Loading library from addon");
      const storageObject = await browser.storage.sync.get(LIBRARY_KEY);
      library = storageObject[LIBRARY_KEY] as LibrarySummary;
    } else {
      logWarn("Loading library from local storage");
      const data = localStorage.getItem(LIBRARY_KEY);
      library = data != null ? JSON.parse(data) : undefined;
    }

    logDebug(`Loaded library: ${JSON.stringify(library, undefined, 2)}`);
    return library;
  } catch (e) {
    logErrorMessage(e);
  }
};
