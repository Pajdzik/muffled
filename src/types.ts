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
  TMessage extends AddonMessage
    ? {
        foo: string;
      }
    : never;
