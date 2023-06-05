export type Book = {
  author: string;
  title: string;
};

export type AddonMessage =
  | {
      data: "parseBook";
      book: Book;
    }
  | never;

export type AddonResponse<TMessage extends AddonMessage> =
  TMessage extends AddonMessage ? BookAvailability : never;

export type BookAvailability = {
  ebook: Availability;
  audiobook: Availability;
};

export type Availability = {
  isHoldable: boolean;
  isAvailable: boolean;
};
