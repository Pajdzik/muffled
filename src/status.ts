import browser from "webextension-polyfill";

import { sendMessageToContentScript } from "./message.js";
import { isLibrarySaved } from "./settings.js";
import { logDebug } from "./debug.js";

const updateStatus = (settingId: string, status: boolean): void => {
  const element = document.getElementById(settingId);
  if (element != null) {
    const statusText = status ? "✅" : "❌";
    element.innerText = statusText;
  }
};

const getActiveTab = async (): Promise<browser.Tabs.Tab | undefined> => {
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

  const isAudibleActive = currentTab?.url != null;
  updateStatus("audibleDetected", isAudibleActive);

  return isAudibleActive;
};

const isProductListAvailable = async (isAudibleUp: boolean): Promise<void> => {
  const currentTab = await getActiveTab();

  const availability =
    isAudibleUp && currentTab != null && currentTab.id != null
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

export const initStatus = async (): Promise<void> => {
  logDebug("Initializing status");

  const audibleDetected = await isAudibleActive();
  const isProductListAvailablePromise = isProductListAvailable(audibleDetected);
  const isLibraryConfiguredPromise = isLibraryConfigured();
  const isOverdriveUpPromise = isOverdriveUp();

  await Promise.allSettled([isProductListAvailablePromise, isLibraryConfiguredPromise, isOverdriveUpPromise]);

  logDebug("Status initialized");
};
