import { logDebug } from "./debug.js";

export type Book = {
  author: string;
  title: string;
};

export const findBooks = (): Book[] => {
  const productList = findProductList();
  if (!productList) {
    return [];
  }

  const products = findProducts(productList);
  const attributes = findProductsAttributes(products);
  const books = parseBooksData(attributes);

  return books;
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

const findProductsAttributes = (
  productContainers: NodeListOf<HTMLLIElement>
): HTMLUListElement[] => {
  const productsAttributes: HTMLUListElement[] = [];

  for (const productContainer of productContainers) {
    const productAttributes = findProductAttributes(productContainer);
    if (productAttributes) {
      productsAttributes.push(productAttributes);
    }
  }

  return productsAttributes;
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

const parseBooksData = (productAttributes: HTMLUListElement[]): Book[] => {
  return productAttributes.map((productAttribute) => ({
    author: getAuthor(productAttribute),
    title: getTitle(productAttribute),
  }));
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
