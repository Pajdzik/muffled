import { createButtons, findBooks } from "./audible.js";
import { AddonMessage, AddonResponse } from "./types.js";

document.body.style.border = "5px solid red";

const sendMessageToBackgroundScript = async <TMessage extends AddonMessage>(
  message: TMessage
): Promise<AddonResponse<TMessage>> => {
  return browser.runtime.sendMessage(message);
};

const main = async () => {
  const bookElements = findBooks();

  bookElements.map(async (bookElement) => {
    const bookAvailability = await sendMessageToBackgroundScript({
      data: "parseBook",
      book: bookElement.book,
    });

    console.log(
      `Availability of ${bookElement.book.title} is ${JSON.stringify(
        bookAvailability
      )}`
    );

    const buttonContainer =
      bookElement.element.querySelector("#adbl-buy-box-area");
    const [audiobookButton, ebookButton] = createButtons(
      bookElement.book,
      bookAvailability,
      "spl"
    );

    buttonContainer?.appendChild(audiobookButton);
    buttonContainer?.appendChild(ebookButton);
  });
};

main();
