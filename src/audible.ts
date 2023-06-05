import { logDebug } from "./debug.js";
import { Book, BookAvailability } from "./types.js";

export type BookComponent = {
  book: Book;
  element: HTMLElement;
};

export const findBooks = (): BookComponent[] => {
  const productList = findProductList();
  if (!productList) {
    return [];
  }

  const products = findProducts(productList);
  const bookComponents = [];

  for (const element of products) {
    const book = findBookData(element);
    if (book) {
      bookComponents.push({
        book,
        element,
      });
    }
  }

  return bookComponents;
};

const findProductList = (): HTMLDivElement | undefined => {
  const productListElements = document.querySelectorAll<HTMLDivElement>(
    "div[data-widget='productList']"
  );

  if (productListElements.length === 0) {
    logDebug("No product list found");
    return undefined;
  } else if (productListElements.length > 1) {
    logDebug("More than one product list found. Returning the first one.");
  }

  return productListElements[0];
};

const findProducts = (
  productList: HTMLDivElement
): NodeListOf<HTMLLIElement> => {
  const productContainers =
    productList.querySelectorAll<HTMLLIElement>("li.productListItem");
  if (productContainers.length === 0) {
    logDebug("No product list items found");
  }

  return productContainers;
};

const findBookData = (productContainer: HTMLLIElement): Book | undefined => {
  const attributes = findProductAttributes(productContainer);
  if (!attributes) {
    return undefined;
  }
  return parseBooksData(attributes);
};

const findProductAttributes = (
  productContainer: HTMLLIElement
): HTMLUListElement | undefined => {
  const attributesList = productContainer.querySelector<HTMLUListElement>(
    "div > div + div > div > div > span > ul"
  );
  if (!attributesList) {
    logDebug("No attributes found");
    return undefined;
  }

  return attributesList;
};

const parseBooksData = (productAttribute: HTMLUListElement): Book => {
  return {
    author: getAuthor(productAttribute),
    title: getTitle(productAttribute),
  };
};

const getTitle = (productAttributeList: HTMLUListElement): string => {
  const titleElement = productAttributeList.querySelector<HTMLLIElement>(
    "li[class='bc-list-item']"
  );

  const titleLink = titleElement?.querySelector("a");
  if (!titleLink) {
    logDebug("No title found");
    return "";
  }

  return titleLink.innerText;
};

const getAuthor = (productAttributeList: HTMLUListElement): string => {
  const authorElement =
    productAttributeList.querySelector<HTMLLIElement>("li.authorLabel");

  const authorLink = authorElement?.querySelector("a");
  if (!authorLink) {
    logDebug("No author found");
    return "";
  }

  return authorLink.innerText;
};

export const createButtons = (bookAvailability: BookAvailability) => {
  const ebookButton = createButton(
    `Ebook ${bookAvailability.ebook.isHoldable ? "" : "not "}available`
  );

  const audiobookButton = createButton(
    `Audiobook ${bookAvailability.audiobook.isHoldable ? "" : "not "}available`
  );

  return [audiobookButton, ebookButton];
};

export const createButton = (caption: string) => {
  const outerDiv = document.createElement("div");
  outerDiv.className = "bc-row bc-spacing-top-micro";

  const innerDiv = document.createElement("div");
  innerDiv.className = "bc-row bc-text-center";

  const span = document.createElement("span");
  span.className = "bc-button bc-button-secondary bc-button-small";

  const button = document.createElement("button");
  button.className = "bc-button-text";
  button.innerText = caption;

  span.appendChild(button);
  innerDiv.appendChild(span);
  outerDiv.appendChild(innerDiv);

  return outerDiv;
};
