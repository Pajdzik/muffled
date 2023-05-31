import { parseHTML } from "linkedom";

const main = async () => {
  const librarySearchResult = await fetch(
    "https://www.spl.org/search?terms=Blood+in+the+garden"
  );

  const parsedLibrarySearchResult = parseHTML(await librarySearchResult.text());
  const foo = parsedLibrarySearchResult.document.body.querySelectorAll(
    ".result-item__heading-link"
  );

  for (const bar of foo) {
    console.log(bar.textContent?.trim());
  }

  const foo2 = parsedLibrarySearchResult.document.body.querySelectorAll(
    ".result-item__author-link"
  );

  for (const bar of foo2) {
    console.log(bar.textContent?.trim());
  }
};

console.log("background script loaded");

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(`[Background] ${JSON.stringify(sender)}`);
  console.log("[Background] message received");
  console.log(JSON.stringify(message, undefined, 2));

  if (message.data === "parseAudible") {
    console.log("changing colo2r");
    // await main();
    console.log("changed color");
  }

  console.log("[Background] Sending response");
  sendResponse({ foo: "bar" });

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("foo"), 5000);
  });
});
