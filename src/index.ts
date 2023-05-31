document.body.style.border = "5px solid red";

const main = async () => {
  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      console.log("INDEX MESSAGE");
      console.log(JSON.stringify(message, null, 2));
    }
  );

  const foo = await browser.runtime.sendMessage({ data: "parseAudible" });
  console.log("[Foreground2] received response");
  console.log(JSON.stringify(foo, null, 2));
};

main();
