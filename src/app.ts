import express, { Response } from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { Request } from 'tedious';
import { Book } from './models/Book';
const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Connection = require('tedious').Connection;

const config = {
    server: 'localhost',
    options: {
        trustServerCertificate: true,
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'anasuditu',
            password: 'Ana_Suditu2901',
        },
    },
};

export const connection = new Connection(config);

connection.on('connect', function (err: Error) {
    //executeStatement();
    //getBooks();
    if (err) {
        console.log(err);
    }
});

connection.connect();

function executeStatement() {
    const request = new Request('SELECT * FROM Bookish.dbo.Books', function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log(column.value);
        });
    });
    connection.execSql(request);
}

// export function getBooks(): Promise<Book[]> {
//     return new Promise((resolve, reject) => {
//         const books: Book[] = [];
//         const sql = 'SELECT bookId, title, ISBN, nrCopies FROM Books';
//
//         const request = new Request(sql, (err) => {
//             if (err) {
//                 reject(err);
//             }
//         });
//
//         request.on('row', (columns) => {
//             const book = new Book(
//                 columns[0].value, // id
//                 columns[1].value, // name
//                 columns[2].value, // isbn
//                 columns[3].value, // nrcopies
//             );
//             books.push(book);
//             console.log(books);
//         });
//
//         request.on('requestCompleted', () => {
//             resolve(books);
//         });
//         connection.execSql(request);
//     });
// }

// function getAllBooks(): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM Bookish.dbo.Books';
//         const results: any[] = [];
//
//         const request = new Request(query, (err) => {
//             if (err) {
//                 reject(err);
//             }
//         });
//
//         request.on('row', (columns) => {
//             const row: any = {};
//             columns.forEach((column) => {
//                 row[column.metadata.colName] = column.value;
//             });
//             results.push(row);
//         });
//
//         request.on('requestCompleted', () => {
//             resolve(results);
//         });
//
//         this.connection.execSql(request);
//     });
// }
//
// getAllBooks()
//     .then((data) => {
//         console.log('Data retrieved:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
