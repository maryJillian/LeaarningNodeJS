export interface IntBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

export abstract class BooksRepository {
  abstract createBook(book: IntBook): void;

  abstract getBook(id: string): IntBook;

  abstract getBooks(): IntBook[];

  abstract updateBook(id: string): void;

  abstract deleteBook(id: string): void;
}