import { Book, TitleAvailability } from "./book.js";
import { BackgroundMessage, addBackgroundListener } from "./message.js";
import { queryLibrary } from "./overdriveBooks.js";
import { loadLibrary } from "./storage.js";

const parseBook = async (book: Book): Promise<TitleAvailability | undefined> => {
  const library = await loadLibrary();
  if (library) {
    const response = queryLibrary(library?.id, book);
    return response;
  }
};

const init = () => {
  addBackgroundListener(async (message: BackgroundMessage) => {
    if (message.data === "parseBook") {
      return parseBook(message.book);
    }

    throw new Error(`Unknown message: ${message}`);
  });
};

init();
