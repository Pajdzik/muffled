import { Book, encodeBookData } from "./book.js";
import { logDebug } from "./debug.js";
import { Availability, TitleAvailability } from "./types.js";

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

export const createButtons = (
  book: Book,
  bookAvailability: TitleAvailability,
  library: string
) => {
  const ebookCaption = getCaption("eBook", bookAvailability.ebook.availability);
  const ebookButton = createButton(
    ebookCaption,
    book,
    bookAvailability.ebook.id,
    library
  );

  const audiobookCaption = getCaption(
    "Audiobook",
    bookAvailability.audiobook.availability
  );
  const audiobookButton = createButton(
    audiobookCaption,
    book,
    bookAvailability.audiobook.id,
    library
  );

  return [audiobookButton, ebookButton];
};

const getCaption = (
  type: "eBook" | "Audiobook",
  availability: Availability
) => {
  switch (availability) {
    case "available":
      return `Rent ${type} 📗`;
    case "holdable":
      return `Place ${type} hold 📙`;
    case "not available":
      return `${type} not available 📕`;
    default:
      throw new Error("Unhandled availabilty");
  }
};

export const createButton = (
  caption: string,
  book: Book,
  id: string,
  library: string
) => {
  const outerDiv = document.createElement("div");
  outerDiv.className = "bc-row bc-spacing-top-micro";

  const innerDiv = document.createElement("div");
  innerDiv.className = "bc-row bc-text-center";

  const span = document.createElement("span");
  span.className = "bc-button bc-button-secondary bc-button-small";

  const button = document.createElement("button");
  button.className = "bc-button-text";

  const link = document.createElement("a");
  link.innerText = caption;
  link.href = `https://libbyapp.com/search/${library}/search/query-${encodeBookData(
    book
  )}/page-1/${id}/request?key=${library}`;

  // https://libbyapp.com/search/spl/search/query-Allergic%20%20Theresa%20MacPhail/page-1/9350370/request?key=spl

  button.appendChild(link);
  span.appendChild(button);
  innerDiv.appendChild(span);
  outerDiv.appendChild(innerDiv);

  return outerDiv;
};
