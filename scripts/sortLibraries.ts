#!/usr/bin/env esrun
import { LibrarySummary } from "./libraryTypes.js";
import { readLibraryDataFile, writeLibraryDataFile } from "./files.js";

const sortLibrary = (library: LibrarySummary, otherLibrary: LibrarySummary) => {
  if (library.name < otherLibrary.name) {
    return -1;
  }

  if (library.name === otherLibrary.name) {
    return 0;
  }

  return 1;
};

const main = async () => {
  const libraries = await readLibraryDataFile<LibrarySummary[]>(
    "../assets/libraries.json"
  );
  const sortedLibraries = libraries.sort(sortLibrary);
  await writeLibraryDataFile("../assets/libraries.json", sortedLibraries);
};

await main();
