import { Book, TitleAvailability } from "./book.js";
import { BackgroundMessage, addBackgroundListener } from "./message.js";
import { queryLibrary } from "./overdriveBooks.js";

const parseBook = async (book: Book): Promise<TitleAvailability> => {
  const response = queryLibrary("spl", book);
  return response;
};

const init = () => {
  addBackgroundListener(async (message: BackgroundMessage) => {
    console.log(`[Background] ${JSON.stringify(message)}`);
    console.log(JSON.stringify(message, undefined, 2));

    if (message.data === "parseBook") {
      return parseBook(message.book);
    }

    throw new Error(`Unknown message: ${message}`);
  });
};

init();
