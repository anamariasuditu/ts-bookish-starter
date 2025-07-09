// import { Book } from '../models/Book';
//
// export class BookRepository {
//     private static books: Book[] = [];
//
//     static async getAll(): Promise<Book[]> {
//         return this.books;
//     }
//
//     static async getById(id: string): Promise<Book | null> {
//         return this.books.find((book) => book.getBookId === id) || null;
//     }
//
//     static async create(book: Book): Promise<Book> {
//         this.books.push(book);
//         return book;
//     }
//
//     static async update(id: string, book: Book): Promise<Book | null> {
//         const index = this.books.findIndex((u) => u.getBookId === id);
//         if (index != -1) {
//             this.books[index] = book;
//             return this.books[index];
//         }
//         return null;
//     }
//
//
// }
