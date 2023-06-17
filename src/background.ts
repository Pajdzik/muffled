import { type Book, type TitleAvailability } from "./book.js";
import { logDebug, logInfo } from "./debug.js";
import { type BackgroundMessage, addBackgroundListener } from "./message.js";
import { queryLibrary } from "./overdriveBooks.js";
import { loadLibrary } from "./storage.js";

const parseBook = async (book: Book): Promise<TitleAvailability | undefined> => {
  const library = await loadLibrary();
  if (library?.id != null) {
    const response = queryLibrary(library?.id, book);
    return response;
  }
};

const init = (): void => {
  logDebug("background script loading");

  addBackgroundListener(async (message: BackgroundMessage) => {
    logDebug(`background script received message: ${JSON.stringify(message)}`);

    if (message.data === "parseBook") {
      logInfo(`Parsing book: ${message.book.author} - "${message.book.title}"`);
      return parseBook(message.book);
    }

    logDebug(`Unknown message`);
  });

  logDebug("background script loaded");
};

init();
