import { sendMessageToContentScript } from "./message.js";
import { isLibrarySaved } from "./settings.js";

const updateStatus = (settingId: string, status: boolean) => {
  const element = document.getElementById(settingId);
  const statusText = status ? "✅" : "❌";
  element!.innerText = statusText;
};

const getActiveTab = async (): Promise<browser.tabs.Tab | undefined> => {
  try {
    const currentTabs = await browser?.tabs.query({
      active: true,
      currentWindow: true,
    });

    return currentTabs[0];
  } catch (e) {
    return undefined;
  }
};

const isAudibleActive = async (): Promise<boolean> => {
  const currentTab = await getActiveTab();

  const isAudibleActive = !!currentTab?.url;
  updateStatus("audibleDetected", isAudibleActive);

  return isAudibleActive;
};

const isProductListAvailable = async (isAudibleUp: boolean): Promise<void> => {
  const currentTab = await getActiveTab();

  const availability =
    isAudibleUp && currentTab && currentTab.id
      ? await sendMessageToContentScript(currentTab.id, {
          data: "detectListing",
        })
      : false;

  updateStatus("listingDetected", availability);
};

const isLibraryConfigured = async (): Promise<void> => {
  const isLibraryConfigured = await isLibrarySaved();
  updateStatus("librarySetup", isLibraryConfigured);
};

const getOverdriveStatus = async (): Promise<boolean> => {
  const result = await fetch("https://thunder.api.overdrive.com/v2/status");
  const statuses = await result.json();

  for (const status of statuses) {
    if (status.status !== "UP") {
      return false;
    }
  }

  return true;
};

const isOverdriveUp = async (): Promise<void> => {
  const isOverdriveUp = await getOverdriveStatus();
  updateStatus("overdriveApiStatus", isOverdriveUp);
};

const initStatus = async (): Promise<void> => {
  const audibleDetected = await isAudibleActive();
  isProductListAvailable(audibleDetected);
  isLibraryConfigured();
  isOverdriveUp();
};

export { initStatus };
