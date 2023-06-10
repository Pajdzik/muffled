import {
  Book,
  TitleAvailability,
  BookAvailability,
  encodeBookData,
} from "./book.js";
import { queryOverdriveApi } from "./overdriveApi.js";
import { OverdriveResponse } from "./overdriveTypes.js";

export const queryLibrary = async (
  library: string,
  book: Book
): Promise<TitleAvailability> => {
  const httpResponse = await queryOverdriveAvailabilityApi(library, book);
  const overdriveResponse: OverdriveResponse = await httpResponse.json();

  return parseOverdriveResponse(overdriveResponse, book.title);
};

const parseOverdriveResponse = (
  overdriveResponse: OverdriveResponse,
  title: string
): TitleAvailability => {
  return {
    audiobook: parseAvailability(overdriveResponse, title, "audiobook"),
    ebook: parseAvailability(overdriveResponse, title, "ebook"),
  };
};

const parseAvailability = (
  overdriveResponse: OverdriveResponse,
  title: string,
  key: "ebook" | "audiobook"
): BookAvailability => {
  const lowerCaseTitle = title.trim().toLowerCase();

  const availabilities = overdriveResponse.items
    .filter((item) => item.title.toLowerCase() === lowerCaseTitle)
    .filter((item) => item.type.id.trim().toLowerCase() === key);

  if (!availabilities || !availabilities.length) {
    return { id: "0", availability: "not available" };
  }

  const isHoldable = availabilities.some(
    (availability) => availability.isHoldable
  );
  const isAvailable = availabilities.some(
    (availability) => availability.isAvailable
  );

  const availability = isAvailable
    ? "available"
    : isHoldable
    ? "holdable"
    : "not available";
  return { id: availabilities[0].id, availability };
};

const queryOverdriveAvailabilityApi = async (
  library: string,
  book: Book
): Promise<Response> => {
  const resource = `libraries/${library}/media`;
  const bookQuery = `query=${encodeBookData(book)}`;

  return queryOverdriveApi(resource, bookQuery);
};
