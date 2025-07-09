import express, { Response } from 'express';
import 'dotenv/config';
import ConnectionPool from 'tedious-connection-pool';
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
const poolConfig = {
    min: 2,
    max: 4,
    log: true,
};

const config = {
    userName: 'anasuditu',
    password: 'Ana_Suditu2901',
    trustServerCertificate: true,
    server: 'localhost',
};



//create the pool
export const pool = new ConnectionPool(poolConfig, config);

pool.on('error', function (err) {
    console.error(err);
});

//acquire a connection
pool.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }

    //use the connection as normal
    const request = new Request('select 42', function (err, rowCount) {
        if (err) {
            console.error(err);
            return;
        }

        console.log('rowCount: ' + rowCount);

        //release the connection back to the pool when finished
        connection.release();
    });

    request.on('row', function (columns) {
        console.log('value: ' + columns[0].value);
    });

    connection.execSql(request);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
