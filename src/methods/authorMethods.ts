import { Author } from '../models/Author';
import { Request, TYPES } from 'tedious';
import { pool } from '../app';

export function getAuthors(): Promise<Author[]> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            if (err) {
                return reject(err);
            }

            const authors: Author[] = [];
            const sql =
                'SELECT authorId, firstname, lastname FROM Bookish.dbo.Authors';

            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(authors);
            });

            request.on('row', (columns) => {
                const author = new Author(
                    columns[0].value,
                    columns[1].value,
                    columns[2].value,
                );
                authors.push(author);
            });

            connection.execSql(request);
        });
    });
}

export function getauthorbyId(id: number): Promise<Author | null> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql =
                'SELECT * FROM Bookish.dbo.Authors WHERE authorId = @id';
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                }
            });

            request.on('row', (columns) => {
                const author = new Author(
                    columns[0].value, // id
                    columns[1].value, // firstname
                    columns[2].value, // lastname
                );

                resolve(author);
            });
            request.addParameter('id', TYPES.Int, id);
            connection.execSql(request);
        });
    });
}

export function createAuthor(author: Author): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                INSERT INTO Bookish.dbo.Authors (firstname, lastname) VALUES (@firstname, @lastname)
            `;
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });

            request.addParameter(
                'firstname',
                TYPES.VarChar,
                author.getFirstname,
            );
            request.addParameter('lastname', TYPES.VarChar, author.getLastname);
            connection.execSql(request);
        });
    });
}

export function updateAuthor(author: Author): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                UPDATE Bookish.dbo.Authors
                SET firstname = @firstname, lastname = @lastname
                WHERE authorId = @id
            `;
            const request = new Request(sql, (err) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            request.addParameter('id', TYPES.Int, author.getAuthorId);
            request.addParameter(
                'firstname',
                TYPES.VarChar,
                author.getFirstname,
            );
            request.addParameter('lastname', TYPES.VarChar, author.getLastname);
            connection.execSql(request);
        });
    });
}

export function deleteAuthor(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.acquire((err, connection) => {
            const sql = `
                DELETE FROM Bookish.dbo.Authors
                WHERE authorId = @id
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
