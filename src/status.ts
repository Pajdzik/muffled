import { sendMessageToContentScript } from "./message.js";

const updateStatus = (settingId: string, status: string) => {
  const element = document.querySelector<HTMLDivElement>(`#${settingId}`);
  element!.innerText = status;
};

const getActiveTab = async (): Promise<browser.tabs.Tab | undefined> => {
  if (!browser) {
    return undefined;
  }

  const currentTabs = await browser?.tabs.query({
    active: true,
    currentWindow: true,
  });

  return currentTabs[0];
};

const isAudibleActive = async (): Promise<void> => {
  const currentTab = await getActiveTab();

  const isAudibleActive = !!currentTab?.url;
  const isAudibleActiveText = isAudibleActive ? "Yes" : "No";
  updateStatus("audibleDetected", isAudibleActiveText);
};

const isProductListAvailable = async (): Promise<void> => {
  const currentTab = await getActiveTab();

  const availability =
    currentTab && currentTab.id
      ? await sendMessageToContentScript(currentTab.id, {
          data: "detectListing",
        })
      : false;

  const isProductListAvailableText = availability ? "Yes" : "No";
  updateStatus("listingDetected", isProductListAvailableText);
};

const initStatus = async (): Promise<void> => {
  isAudibleActive();
  isProductListAvailable();
};

export { initStatus };
