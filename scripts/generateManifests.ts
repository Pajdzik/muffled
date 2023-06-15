#!/usr/bin/env esrun

import path from "path";
import { readFile, writeFile } from "./files.js";

type Manifest = Record<any, any>;

const loadChromeSpecificSettings = async (): Promise<Manifest> =>
  readFile<Manifest>(path.join(__dirname, "../manifest.chrome.json"));
const loadFirefoxSpecificSettings = async (): Promise<Manifest> =>
  readFile<Manifest>(path.join(__dirname, "../manifest.firefox.json"));
const loadCommonManifest = async (): Promise<Manifest> =>
  readFile<Manifest>(path.join(__dirname, "../manifest.common.json"));

async function writeChromeManifest(commonManifest: Manifest, chromeSpecificSettings: Manifest): Promise<void> {
  const chromeManifest = { ...commonManifest, ...chromeSpecificSettings };
  await writeManifest(chromeManifest, "../dist/chrome/manifest.json");
}

async function writeFirefoxManifest(commonManifest: Manifest, firefoxSpecificSettings: Manifest): Promise<void> {
  const firefoxManifext = { ...commonManifest, ...firefoxSpecificSettings };
  await writeManifest(firefoxManifext, "../dist/firefox/manifest.json");
}

const writeManifest = async (manifest: Manifest, outputPath: string): Promise<void> => {
  const fullPath = path.join(__dirname, outputPath);
  await writeFile(fullPath, manifest, true);
};

const main = async (): Promise<void> => {
  const chromeSpecificSettings = await loadChromeSpecificSettings();
  const firefoxSpecificSettings = await loadFirefoxSpecificSettings();
  const commonManifest = await loadCommonManifest();

  await writeChromeManifest(commonManifest, chromeSpecificSettings);
  await writeFirefoxManifest(commonManifest, firefoxSpecificSettings);
};

await main();
