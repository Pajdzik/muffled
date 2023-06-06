import { Book } from "./book.js";

export type AddonMessage =
  | {
      data: "parseBook";
      book: Book;
    }
  | never;

export type AddonResponse<TMessage extends AddonMessage> =
  TMessage extends AddonMessage ? TitleAvailability : never;

export type TitleAvailability = {
  ebook: BookAvailability;
  audiobook: BookAvailability;
};

export type BookAvailability = {
  id: string;
  availability: Availability;
};

export type Availability = "available" | "holdable" | "not available";
