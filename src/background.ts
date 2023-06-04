import { AddonMessage, Book } from "./types.js";
import { queryLibrary } from "./overdrive.js";

console.log("background script loaded");

browser.runtime.onMessage.addListener(async (message: AddonMessage) => {
  console.log(`[Background] ${JSON.stringify(message)}`);
  console.log(JSON.stringify(message, undefined, 2));

  if (message.data === "parseBook") {
    console.log("changed color");
  }

  const resp = await queryLibrary("spl", {
    author: "Theresa MacPhail",
    title: "Allergic",
  });

  console.log("[Background] Lib response");
  console.log(JSON.stringify(resp, undefined, 2));
  console.log("[Background] Sending response");

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("foo"), 5000);
  });
});
