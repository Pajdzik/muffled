import { initSettings } from "./settings.js";
import { initStatus } from "./status.js";

const activate = (id: string, initTab: () => void) => {
  deactivateAll();
  const element = document.querySelector<HTMLDivElement>(`#${id}`);
  if (element) {
    element.style.display = "block";
    initTab();
  }
};

const deactivateAll = () => {
  const tabContents = document.querySelectorAll<HTMLDivElement>(`.tab-content`);
  tabContents.forEach((tabContent) => {
    tabContent.style.display = "none";
  });
};

const assignButtonHandler = (id: string, handler: () => void) => {
  const button = document.querySelector<HTMLButtonElement>(`#${id}Button`);
  button!.addEventListener("click", handler);
};

const init = () => {
  assignButtonHandler("status", () => activate("status", initStatus));
  assignButtonHandler("settings", () => activate("settings", initSettings));
  assignButtonHandler("logs", () => activate("logs", () => {}));

  activate("settings", initSettings);
};

init();
