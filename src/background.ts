import { Book, TitleAvailability } from "./book.js";
import { logDebug, logInfo } from "./debug.js";
import { BackgroundMessage, addBackgroundListener } from "./message.js";
import { queryLibrary } from "./overdriveBooks.js";
import { loadLibrary } from "./storage.js";

const parseBook = async (book: Book): Promise<TitleAvailability | undefined> => {
  const library = await loadLibrary();
  if (library?.id) {
    const response = queryLibrary(library?.id, book);
    return response;
  }
};

const init = () => {
  logDebug("background script loading");

  addBackgroundListener(async (message: BackgroundMessage) => {
    logDebug(`background script received message: ${message}`);

    if (message.data === "parseBook") {
      logInfo(`Parsing book: ${message.book}`);
      return parseBook(message.book);
    }

    logDebug(`Unknown message: ${message}`);
  });

  logDebug("background script loaded");
};

init();
