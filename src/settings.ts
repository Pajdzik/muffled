import data from "./assets/libraries.json" assert { type: "json" };
import { logDebug } from "./debug.js";
import { type LibrarySummary } from "./libraryTypes.js";
import { saveLibrary, loadLibrary } from "./storage.js";

const libraries = data as LibrarySummary[];

let loaded = false;

const createLibraryOption = (library: LibrarySummary): HTMLOptionElement => new Option(library.name);

const addLibraryOptions = (): void => {
  const selectElement = document.getElementById("libraries");

  for (const library of libraries) {
    selectElement?.appendChild(createLibraryOption(library));
  }
};

const initSaveButton = (): void => {
  const saveButton = document.getElementById("saveButton");
  saveButton?.addEventListener("click", () => {
    void saveCurrentLibrary();
  });
};

const saveCurrentLibrary = async (): Promise<void> => {
  const librarySelect = document.getElementById("libraryInput") as HTMLInputElement;
  const libraryName = librarySelect.value;
  const libraryKey = libraries.find((l) => l.name === libraryName);
  if (libraryKey != null) {
    await saveLibrary(libraryKey);
  }
};

export const isLibrarySaved = async (): Promise<boolean> => {
  const libraryKey = await loadLibrary();
  return libraryKey !== undefined;
};

const initSelectedLibrary = async (): Promise<void> => {
  const libraryKey = await loadLibrary();
  if (libraryKey != null) {
    const librarySelect = document.getElementById("libraryInput") as HTMLInputElement;
    if (librarySelect == null) {
      throw new Error("Library select element not found");
    }

    const library = libraries.find((l) => l.id === libraryKey.id);
    if (library == null) {
      throw new Error(`Library not found for id: ${libraryKey.id}`);
    }

    librarySelect.value = library.name ?? "";
  }
};

export const initSettings = async (): Promise<void> => {
  logDebug("Initializing settings");

  addLibraryOptions();
  initSaveButton();
  await initSelectedLibrary();

  logDebug("Settings initialized");
};
