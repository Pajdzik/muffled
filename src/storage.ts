import browser from "webextension-polyfill";

import { LibrarySummary } from "./libraryTypes.js";

const runsInAddon = () => typeof window === "undefined" || !window.browser;
const LIBRARY_KEY = "aulible-library-key";

export const saveLibrary = async (library: LibrarySummary): Promise<void> => {
  if (runsInAddon()) {
    await browser.storage.sync.set({ LIBRARY_KEY: library });
  } else {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
};

export const loadLibrary = async (): Promise<LibrarySummary | undefined> => {
  if (runsInAddon()) {
    const libraryKey = await browser.storage.sync.get(LIBRARY_KEY);
    return libraryKey[LIBRARY_KEY];
  }

  const libraryKey = localStorage.getItem(LIBRARY_KEY);
  return libraryKey ? JSON.parse(libraryKey) : undefined;
};
