import data from "./assets/libraries.json" assert { type: "json" };
import { LibrarySummary } from "./libraryTypes.js";

const LIBRARY_KEY = "aulible-library-key";
const libraries = data as LibrarySummary[];

const createLibraryOption = (library: LibrarySummary) =>
  new Option(library.name, library.id);

const addLibraryOptions = () => {
  const selectElement = document.getElementById("librarySelect");

  for (const library of libraries) {
    selectElement?.appendChild(createLibraryOption(library));
  }
};

const initFilter = () => {
  const filter = document.getElementById("libraryFilter") as HTMLInputElement;
  filter.addEventListener("input", () => {
    const filterValue = filter.value.toLowerCase().trim();
    const libraryOptions = document.querySelectorAll<HTMLOptionElement>(
      "#librarySelect option"
    );

    libraryOptions.forEach((libraryOption) => {
      const libraryName = libraryOption.text.toLowerCase();
      if (libraryName.includes(filterValue)) {
        libraryOption.style.display = "block";
      } else {
        libraryOption.style.display = "none";
      }
    });
  });
};

const initLibrarySelect = () => {
  const librarySelect = document.getElementById(
    "librarySelect"
  ) as HTMLSelectElement;

  librarySelect.addEventListener("change", () => {
    const libraryId = librarySelect.value;
    const library = libraries.find((library) => library.id === libraryId);
    saveLibraryKey(library!);
  });
};

const saveLibraryKey = (library: LibrarySummary) => {
  if (window.browser) {
    browser.storage.sync.set({ LIBRARY_KEY: library });
  }
};

const loadLibraryKey = async (): Promise<LibrarySummary> => {
  if (!window.browser) {
    return Promise.resolve({ id: "spl", name: "Seattle Debug Library" });
  }

  const libraryKey = await browser.storage.sync.get(LIBRARY_KEY);
  return libraryKey[LIBRARY_KEY];
};

export const isLibrarySaved = async (): Promise<boolean> => {
  const libraryKey = await loadLibraryKey();
  return libraryKey !== undefined;
};

const initSelectedLibrary = async () => {
  const libraryKey = await loadLibraryKey();
  const librarySelect = document.getElementById(
    "librarySelect"
  ) as HTMLSelectElement;
  librarySelect.value = libraryKey.id;
};

const initClearFilterButton = () => {
  const clearFilterButton = document.getElementById(
    "clearFilterButton"
  ) as HTMLButtonElement;

  clearFilterButton.addEventListener("click", () => {
    const filter = document.getElementById("libraryFilter") as HTMLInputElement;
    filter.value = "";
    filter.dispatchEvent(new Event("input"));
  });
};

export const initSettings = async (): Promise<void> => {
  addLibraryOptions();
  initFilter();
  initLibrarySelect();
  initClearFilterButton();

  await initSelectedLibrary();
};
