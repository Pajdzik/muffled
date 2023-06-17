import { logDebug } from "./debug.js";
import { initSettings } from "./settings.js";
import { initStatus } from "./status.js";

const activate = (id: string, initTab: () => void): void => {
  deactivateAll();
  const element = document.querySelector<HTMLDivElement>(`#${id}`);
  if (element != null) {
    element.style.display = "block";
    initTab();
  }
};

const deactivateAll = (): void => {
  const tabContents = document.querySelectorAll<HTMLDivElement>(`.tab-content`);
  tabContents.forEach((tabContent) => {
    tabContent.style.display = "none";
  });
};

const assignButtonHandler = (id: string, handler: () => void): void => {
  const button = document.querySelector<HTMLButtonElement>(`#${id}Button`);
  if (button != null) {
    button.addEventListener("click", handler);
  }
};

const init = (): void => {
  logDebug("Initializing popup");

  assignButtonHandler("status", () => {
    activate("status", () => {
      void initStatus();
    });
  });
  assignButtonHandler("settings", () => {
    activate("settings", () => {
      void initSettings();
    });
  });
  assignButtonHandler("logs", () => {
    activate("logs", () => {});
  });

  activate("settings", () => {
    void initSettings();
  });

  logDebug("Popup initialized");
};

init();
