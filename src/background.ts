import { AddonMessage, TitleAvailability } from "./types.js";
import { queryLibrary } from "./overdrive.js";
import { Book } from "./book.js";

console.log("background script loaded");

browser.runtime.onMessage.addListener(async (message: AddonMessage) => {
  console.log(`[Background] ${JSON.stringify(message)}`);
  console.log(JSON.stringify(message, undefined, 2));

  if (message.data === "parseBook") {
    return parseBook(message.book);
  }

  throw new Error(`Unknown message: ${message}`);
});

const parseBook = async (book: Book): Promise<TitleAvailability> => {
  const response = queryLibrary("spl", book);
  return response;
};
