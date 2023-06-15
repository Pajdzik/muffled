#!/usr/bin/env esrun
import path from "path";
import { LibrarySummary } from "./libraryTypes.js";
import { readFile, writeFile } from "./files.js";

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
  const fullPath = path.join(__dirname, "../src/assets/libraries.json");
  const libraries = await readFile<LibrarySummary[]>(fullPath);
  const sortedLibraries = libraries.sort(sortLibrary);
  await writeFile(fullPath, sortedLibraries);
};

await main();
