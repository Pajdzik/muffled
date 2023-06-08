import { isAudibleActive } from "./status.js";

const activate = (id: string) => {
  deativateAll();
  const element = document.querySelector<HTMLDivElement>(`#${id}`);
  if (element) {
    element.style.display = "block";
  }
};

const deativateAll = () => {
  const tabContents = document.querySelectorAll<HTMLDivElement>(`.tab-content`);
  tabContents.forEach((tabContent) => {
    tabContent.style.display = "none";
  });
};

document.querySelectorAll("button").forEach((button) => {
  const buttonId = button.id.slice(0, -"Button".length);
  button.addEventListener("click", () => activate(buttonId));
});

isAudibleActive().then((isAudibleActive) => {
  const audibleStatus =
    document.querySelector<HTMLDivElement>("#audibleStatus");
  audibleStatus!.innerText = JSON.stringify(isAudibleActive, null, 2);
  console.log(isAudibleActive);
});
