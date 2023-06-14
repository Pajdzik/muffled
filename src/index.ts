import { createButtons, findBooks, isProductListAvailable } from "./audible.js";
import { ContentMessage, sendMessageToBackgroundScript } from "./message.js";

document.body.style.border = "5px solid red";

const main = async () => {
  const bookElements = findBooks();

  bookElements.map(async (bookElement) => {
    const bookAvailability = await sendMessageToBackgroundScript({
      data: "parseBook",
      book: bookElement.book,
    });

    console.log(`Availability of ${bookElement.book.title} is ${JSON.stringify(bookAvailability)}`);

    if (bookAvailability) {
      const buttonContainer = bookElement.element.querySelector("#adbl-buy-box-area");
      const [audiobookButton, ebookButton] = createButtons(bookElement.book, bookAvailability, "spl");

      buttonContainer?.appendChild(audiobookButton);
      buttonContainer?.appendChild(ebookButton);
    }
  });
};

const initListener = () => {
  browser.runtime.onMessage.addListener(async (message: ContentMessage) => {
    console.log(`Message received: ${JSON.stringify(message)}`);
    if (message.data === "detectListing") {
      return isProductListAvailable();
    }
  });
};

initListener();
main();
