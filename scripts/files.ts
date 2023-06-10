#!/usr/bin/env esrun

import { promises as fs } from "fs";
import path from "path";

const encoding = "utf-8";

export const readLibraryDataFile = async <TData>(
  relativeFilePath: string
): Promise<TData> => {
  const fullPath = path.join(__dirname, relativeFilePath);
  const content = await fs.readFile(fullPath, encoding);
  return JSON.parse(content) as TData;
};

export const writeLibraryDataFile = async (
  relativeFilePath: string,
  data: any
): Promise<void> => {
  const fullPath = path.join(__dirname, relativeFilePath);
  const content = JSON.stringify(data);
  await fs.writeFile(fullPath, content, encoding);
};
