"use server";

import * as fs from "fs";
import * as path from "path";

export const getWordList = async (language: string) => {
  // https://www.w3schools.com/nodejs/nodejs_filesystem.asp

  const filePath = path.join(process.cwd(), "src", "assets", `${language}.txt`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Word list not found: ${filePath}`);
  }

  const words = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
  return JSON.stringify(Array.from(new Set(words)));
};

export const validateWord = async (language: string, word: string) => {
  const raw = await getWordList(language);
  const resolvedWords = new Set(JSON.parse(raw));

  return {
    word,
    language,
    status: resolvedWords.has(word),
  };
};
