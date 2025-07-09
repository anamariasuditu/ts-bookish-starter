import { Book } from '../models/Book';
import { Connection, Request, TYPES } from 'tedious';
import { connection } from '../app';
import { config } from 'dotenv';

export function getBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
        const books: Book[] = [];
        const sql = 'SELECT bookId, title, ISBN, nrCopies FROM Bookish.dbo.Books';

        const request = new Request(sql, (err) => {
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
            books.push(book);
        });

        request.on('requestCompleted', () => {
            resolve(books);
        });
        connection.execSql(request);
    });
}

export function getById(id: number): Promise<Book | null> {
    console.log(id);
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Bookish.dbo.Books WHERE bookId = @id';
        const request = new Request(sql, (err) => {
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
            console.log(book);
            resolve(book);
        });
        request.addParameter('id', TYPES.Int, id);
        connection.execSql(request);
    });
}

export function createBook(book: Book): Promise<void> {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO Bookish.dbo.Books (title, ISBN, nrCopies) VALUES (@title, @ISBN, @nrCopies)
        `;
        const request = new Request(sql, (err) => {
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
}

