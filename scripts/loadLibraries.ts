#!/usr/bin/env esrun

import {
  Library,
  LibrarySearchResult,
  LibrarySummary,
} from "./libraryTypes.js";
import { readLibraryDataFile, writeLibraryDataFile } from "./files.js";

const loadSampleResultPage = async (): Promise<LibrarySearchResult> => {
  return readLibraryDataFile<LibrarySearchResult>(`./sample.json`);
};

const loadSampleLibraries = async (): Promise<Array<LibrarySummary>> => {
  const result = await loadSampleResultPage();
  const libraries = await parseSearchResult(result);
  return libraries;
};

const range = (start: number, end: number): Array<number> => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const isPromiseFullfilled = <TResult>(
  promise: PromiseSettledResult<TResult>
): promise is PromiseFulfilledResult<TResult> => promise.status === "fulfilled";

const loadLibraries = async (): Promise<Array<LibrarySummary>> => {
  const firstPage = await fetchLibraries(1);
  const maxPage = firstPage.links.last.page;

  const queryPromises = range(2, maxPage).map(async (page) => {
    const result = await fetchLibraries(page);
    const summary = parseSearchResult(result);
    return summary;
  });

  const results = await Promise.allSettled(queryPromises);
  const summaries = results
    .filter(isPromiseFullfilled)
    .flatMap((summary) => summary.value);

  const firstPageSummary = parseSearchResult(firstPage);
  return [...firstPageSummary, ...summaries];
};

const fetchLibraries = async (page: number): Promise<LibrarySearchResult> => {
  console.log(`Fetching page ${page}...`);

  const response = await fetch(
    `https://thunder.api.overdrive.com/v2/libraries?page=${page}`
  );

  return response.json();
};

const parseSearchResult = (
  result: LibrarySearchResult
): Array<LibrarySummary> => {
  return result.items
    .filter(isNotDemoLibrary)
    .filter(supportsLibby)
    .map((library) => ({
      name: library.name,
      id: library.id,
    }));
};

const isNotDemoLibrary = (library: Library) => !library?.isDemo;
const supportsLibby = (library: Library) =>
  library?.enabledPlatforms?.includes("libby");

const parseMode = (): "sample" | "live" => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return "sample";
  }

  const mode = args[0];
  if (mode === "sample" || mode === "live") {
    return mode;
  }

  throw new Error(`Invalid mode: ${mode}`);
};

const main = async () => {
  const mode = parseMode();
  console.log(`Loading libraries in ${mode} mode...`);

  const libraries = await (mode === "live"
    ? loadLibraries()
    : loadSampleLibraries());

  console.log(`Loaded ${libraries.length} libraries`);

  await writeLibraryDataFile(`../assets/libraries.json`, libraries);
  console.log(`Saved libraries to file`);
};

await main();
