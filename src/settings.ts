import data from "./assets/libraries.json" assert { type: "json" };
import { LibrarySummary } from "./libraryTypes.js";
import { saveLibrary, loadLibrary } from "./storage.js";

const libraries = data as LibrarySummary[];

let loaded = false;

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
    await saveLibrary(libraryKey);
  }
};

export const isLibrarySaved = async (): Promise<boolean> => {
  const libraryKey = await loadLibrary();
  return libraryKey !== undefined;
};

const initSelectedLibrary = async () => {
  const libraryKey = await loadLibrary();
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
