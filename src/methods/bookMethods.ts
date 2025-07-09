import { Book } from '../models/Book';
import { Request, TYPES } from 'tedious';
import { pool } from '../app';

export function getBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            if (err) {
                return reject(err);
            }

            const books: Book[] = [];
            const sql = 'SELECT bookId, title, ISBN, nrCopies FROM Bookish.dbo.Books';

            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(books);
            });

            request.on('row', (columns) => {
                const book = new Book(
                    columns[0].value,
                    columns[1].value,
                    columns[2].value,
                    columns[3].value
                );
                books.push(book);
            });

            connection.execSql(request);
        });
    });
}

export function getById(id: number): Promise<Book | null> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = 'SELECT * FROM Bookish.dbo.Books WHERE bookId = @id';
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                }
            });

            request.on('row', (columns) => {
                const book = new Book(
                    columns[0].value, // id
                    columns[1].value, // name
                    columns[2].value, // isbn
                    columns[3].value, // nrcopies
                );

                resolve(book);
            });
            request.addParameter('id', TYPES.Int, id);
            connection.execSql(request);
        });
    });
}

export function createBook(book: Book): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                INSERT INTO Bookish.dbo.Books (title, ISBN, nrCopies) VALUES (@title, @ISBN, @nrCopies)
            `;
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });

            request.addParameter('title', TYPES.VarChar, book.getTitle);
            request.addParameter('ISBN', TYPES.BigInt, book.getISBN);
            request.addParameter('nrCopies', TYPES.Int, book.getNrCopies);
            connection.execSql(request);
        });
    });
}

export function updateBook(book: Book): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                UPDATE Bookish.dbo.Books
                SET title = @title, ISBN = @ISBN, nrCopies = @nrCopies
                WHERE bookId = @id
            `;
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            request.addParameter('id', TYPES.Int, book.getBookId);
            request.addParameter('title', TYPES.VarChar, book.getTitle);
            request.addParameter('ISBN', TYPES.VarChar, book.getISBN);
            request.addParameter('nrCopies', TYPES.Int, book.getNrCopies);
            connection.execSql(request);
        });
    });
}

export function deleteBook(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                DELETE FROM Bookish.dbo.Books
                WHERE bookId = @id
            `;
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            request.addParameter('id', TYPES.Int, id);
            connection.execSql(request);
        });
    });
}



