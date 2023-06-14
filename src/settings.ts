import data from "./assets/libraries.json" assert { type: "json" };
import { LibrarySummary } from "./libraryTypes.js";

const LIBRARY_KEY = "aulible-library-key";
const libraries = data as LibrarySummary[];

let loaded = false;

const runsInAddon = () => typeof window === "undefined" || !window.browser;

const createLibraryOption = (library: LibrarySummary) => new Option(library.name);

const addLibraryOptions = () => {
  const selectElement = document.getElementById("libraries");

  for (const library of libraries) {
    selectElement?.appendChild(createLibraryOption(library));
  }
};

const initSaveButton = () => {
  const saveButton = document.getElementById("saveButton");
  saveButton?.addEventListener("click", saveCurrentLibrary);
};

const saveCurrentLibrary = async (): Promise<void> => {
  const librarySelect = document.getElementById("libraryInput") as HTMLInputElement;
  const libraryName = librarySelect.value;
  const libraryKey = libraries.find((l) => l.name === libraryName);
  if (libraryKey) {
    await saveLibraryKey(libraryKey);
  }
};

const saveLibraryKey = async (library: LibrarySummary): Promise<void> => {
  if (runsInAddon()) {
    await browser.storage.sync.set({ LIBRARY_KEY: library });
  } else {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
};

const loadLibraryKey = async (): Promise<LibrarySummary | undefined> => {
  if (runsInAddon()) {
    const libraryKey = await browser.storage.sync.get(LIBRARY_KEY);
    return libraryKey[LIBRARY_KEY];
  }

  const libraryKey = localStorage.getItem(LIBRARY_KEY);
  return libraryKey ? JSON.parse(libraryKey) : undefined;
};

export const isLibrarySaved = async (): Promise<boolean> => {
  const libraryKey = await loadLibraryKey();
  return libraryKey !== undefined;
};

const initSelectedLibrary = async () => {
  const libraryKey = await loadLibraryKey();
  if (libraryKey) {
    const librarySelect = document.getElementById("libraryInput") as HTMLInputElement;
    const libraryName = libraries.find((l) => l.id === libraryKey.id)?.name;
    librarySelect.value = libraryName ?? "";
  }
};

export const initSettings = async (): Promise<void> => {
  if (loaded) {
    return;
  }

  addLibraryOptions();
  initSaveButton();
  await initSelectedLibrary();
  loaded = true;
};
