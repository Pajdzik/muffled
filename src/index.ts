import browser from "webextension-polyfill";

import { createButtons, findBooks, isProductListAvailable } from "./audible.js";
import { ContentMessage, sendMessageToBackgroundScript } from "./message.js";
import { logDebug, logInfo } from "./debug.js";

document.body.style.border = "5px solid red";

const main = async () => {
  logInfo("Starting Aulibby");

  const bookElements = findBooks();

  bookElements.map(async (bookElement) => {
    const bookAvailability = await sendMessageToBackgroundScript({
      data: "parseBook",
      book: bookElement.book,
    });

    logDebug(`Availability of ${bookElement.book.title} is ${JSON.stringify(bookAvailability)}`);

    if (bookAvailability) {
      const buttonContainer = bookElement.element.querySelector("#adbl-buy-box-area");
      const [audiobookButton, ebookButton] = createButtons(bookElement.book, bookAvailability, "spl");

      buttonContainer?.appendChild(audiobookButton);
      buttonContainer?.appendChild(ebookButton);
    }
  });
};

const initListener = () => {
  logInfo("Initializing listener");

  browser.runtime.onMessage.addListener(async (message: ContentMessage) => {
    logDebug(`Message received: ${JSON.stringify(message)}`);

    if (message.data === "detectListing") {
      logInfo("Detecting listing");
      return isProductListAvailable();
    }

    logDebug(`Unknown message: ${message}`);
  });
};

initListener();
main();
