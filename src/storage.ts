import browser from "webextension-polyfill";

import { type LibrarySummary } from "./libraryTypes.js";
import { logDebug, logError, logWarn } from "./debug.js";

const runsInAddon = () => typeof window === "undefined" || !window.browser;
const LIBRARY_KEY = "aulible-library-key";

export const saveLibrary = async (library: LibrarySummary): Promise<void> => {
  try {
    logDebug(`Saving library: ${library.name}`);

    if (runsInAddon()) {
      logDebug("Saving library in addon");
      await browser.storage.sync.set({ LIBRARY_KEY: library });
    } else {
      logWarn("Saving library in local storage");
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
    }

    logDebug("Library saved");
  } catch (e) {
    logError(`Error saving library: ${e}`);
  }
};

export const loadLibrary = async (): Promise<LibrarySummary | undefined> => {
  try {
    logDebug("Loading library");
    let library: LibrarySummary | undefined;

    if (runsInAddon()) {
      logDebug("Loading library from addon");
      library = (await browser.storage.local.get([LIBRARY_KEY])) as LibrarySummary;
    } else {
      logWarn("Loading library from local storage");
      const data = localStorage.getItem(LIBRARY_KEY);
      library = data ? JSON.parse(data) : undefined;
    }

    logDebug(`Loaded library: ${JSON.stringify(library, undefined, 2)}`);
    return library;
  } catch (e) {
    logError(`Error loading library: ${e}`);
  }
};
