export interface Book {
  author: string;
  title: string;
}

export interface TitleAvailability {
  ebook: BookAvailability;
  audiobook: BookAvailability;
}

export interface BookAvailability {
  id: string;
  availability: Availability;
}

export type Availability = "available" | "holdable" | "not available";

export const encodeBookData = (book: Book): string => encodeURIComponent(flattenBookData(book));

const flattenBookData = (book: Book): string => {
  if (book.author && book.title) {
    return `${book.title}  ${book.author}`;
  } else if (book.author) {
    return book.author;
  } else if (book.title) {
    return book.title;
  }

  throw new Error("Empty book data");
};
