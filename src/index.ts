import { findBooks } from "./audible.js";

document.body.style.border = "5px solid red";

const main = async () => {
  const booksOnPage = findBooks();
  console.log(booksOnPage);

  const foo = await browser.runtime.sendMessage({ data: "parseAudible" });
  console.log("[Foreground2] received response");
  console.log(JSON.stringify(foo, null, 2));
};

main();
