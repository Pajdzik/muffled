import { logDebug } from "./debug.js";
import { initSettings } from "./settings.js";
import { initStatus } from "./status.js";

const activate = async (id: string, initTab: () => Promise<void>): Promise<void> => {
  deactivateAll();
  const element = document.getElementById(id) as HTMLDivElement;
  if (element != null) {
    element.style.display = "block";
    await initTab();
  }
};

const deactivateAll = (): void => {
  const tabContents = document.querySelectorAll<HTMLDivElement>(`.tab-content`);
  tabContents.forEach((tabContent) => {
    tabContent.style.display = "none";
  });
};

const assignButtonHandler = (id: string, handler: () => Promise<void>): void => {
  const button = document.querySelector<HTMLButtonElement>(`#${id}Button`);
  if (button != null) {
    button.addEventListener("click", () => {
      void handler();
    });
  }
};

const activateStatusTab = async (): Promise<void> => {
  await activate("status", initStatus);
};

const activateSettingsTab = async (): Promise<void> => {
  await activate("settings", initSettings);
};

const activateLogsTab = async (): Promise<void> => {};

const init = async (): Promise<void> => {
  logDebug("Initializing popup");

  assignButtonHandler("status", activateStatusTab);
  assignButtonHandler("settings", activateSettingsTab);
  assignButtonHandler("logs", activateLogsTab);

  await activateSettingsTab();

  logDebug("Popup initialized");
};

void init();
