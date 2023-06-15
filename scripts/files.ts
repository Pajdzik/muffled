#!/usr/bin/env esrun

import { PathLike, promises as fs } from "fs";
import path from "path";

const encoding = "utf-8";

export const readFile = async <TData>(fullPath: string): Promise<TData> => {
  const content = await fs.readFile(fullPath, encoding);
  return JSON.parse(content) as TData;
};

export const writeFile = async (fullPath: string, data: any, format?: boolean): Promise<void> => {
  const directory = path.dirname(fullPath);
  await fs.mkdir(directory, { recursive: true });

  const content = JSON.stringify(data, undefined, format ? 2 : undefined);
  await fs.writeFile(fullPath, content, encoding);
};
