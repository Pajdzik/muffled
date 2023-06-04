import { findBooks } from "./audible.js";
import { AddonMessage, AddonResponse, Events } from "./types.js";

document.body.style.border = "5px solid red";

const sendMessageToBackgroundScript = async <TMessage extends AddonMessage>(
  message: TMessage
): Promise<AddonResponse<TMessage>> => {
  return browser.runtime.sendMessage(message);
};

const main = async () => {
  const booksOnPage = findBooks();
  console.log(booksOnPage);

  const response = await sendMessageToBackgroundScript({
    data: "parseBook",
    book: {
      title: "Allergic",
      author: "Theresa MacPhail",
    },
  });

  console.log("[Foreground2] received response");
  console.log(JSON.stringify(response.foo, null, 2));
};

main();
