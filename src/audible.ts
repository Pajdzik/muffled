import { Availability, Book, BookAvailability, TitleAvailability, encodeBookData } from "./book.js";
import { logDebug, logInfo, logWarn } from "./debug.js";

export type BookComponent = {
  book: Book;
  element: HTMLElement;
};

export const findBooks = (): BookComponent[] => {
  logDebug("Finding books");

  const productList = findProductList();
  if (!productList) {
    logDebug("No product list found");
    return [];
  }

  const products = findProducts(productList);
  logDebug(`Found ${products.length} products`);

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

  logInfo(`Found ${bookComponents.length} books`);
  return bookComponents;
};

export const isProductListAvailable = (): boolean => {
  const productList = findProductList();
  logDebug(`Product list available: ${!!productList}`);
  return !!productList;
};

const findProductList = (): HTMLDivElement | undefined => {
  const productListElements = document.querySelectorAll<HTMLDivElement>("div[data-widget='productList']");

  if (productListElements.length === 0) {
    return undefined;
  } else if (productListElements.length > 1) {
    logWarn("More than one product list found. Returning the first one.");
  }

  return productListElements[0];
};

const findProducts = (productList: HTMLDivElement): NodeListOf<HTMLLIElement> => {
  const productContainers = productList.querySelectorAll<HTMLLIElement>("li.productListItem");
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

const findProductAttributes = (productContainer: HTMLLIElement): HTMLUListElement | undefined => {
  const attributesList = productContainer.querySelector<HTMLUListElement>("div > div + div > div > div > span > ul");
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
  const titleElement = productAttributeList.querySelector<HTMLLIElement>("li[class='bc-list-item']");

  const titleLink = titleElement?.querySelector("a");
  if (!titleLink) {
    logDebug("No title found");
    return "";
  }

  return titleLink.innerText;
};

const getAuthor = (productAttributeList: HTMLUListElement): string => {
  const authorElement = productAttributeList.querySelector<HTMLLIElement>("li.authorLabel");

  const authorLink = authorElement?.querySelector("a");
  if (!authorLink) {
    logDebug("No author found");
    return "";
  }

  return authorLink.innerText;
};

export const createButtons = (book: Book, bookAvailability: TitleAvailability, library: string) => {
  logDebug("Creating buttons");

  const ebookButton = createButton(book, "eBook", bookAvailability.ebook, library);
  const audiobookButton = createButton(book, "Audiobook", bookAvailability.audiobook, library);

  return [audiobookButton, ebookButton];
};

const getCaption = (type: "eBook" | "Audiobook", availability: Availability) => {
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
  book: Book,
  type: "eBook" | "Audiobook",
  availability: BookAvailability,
  library: string
) => {
  const openNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  const outerDiv = document.createElement("div");
  outerDiv.className = "bc-row bc-spacing-top-micro";

  const innerDiv = document.createElement("div");
  innerDiv.className = "bc-row bc-text-center";

  const span = document.createElement("span");
  span.className = "bc-button bc-button-secondary bc-button-small";

  const caption = getCaption(type, availability.availability);
  const button = document.createElement("button");
  button.className = "bc-button-text";
  button.textContent = caption;

  if (availability.availability !== "not available") {
    const link = `https://libbyapp.com/search/${library}/search/query-${encodeBookData(book)}/page-1/${
      availability.id
    }/request?key=${library}`;

    button.onclick = () => {
      openNewTab(link);
    };
  } else {
    button.disabled = true;
  }

  span.appendChild(button);
  innerDiv.appendChild(span);
  outerDiv.appendChild(innerDiv);

  return outerDiv;
};
