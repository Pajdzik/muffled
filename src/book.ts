export type Book = {
  author: string;
  title: string;
};

export const encodeBookData = (book: Book) =>
  encodeURIComponent(flattenBookData(book));

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
