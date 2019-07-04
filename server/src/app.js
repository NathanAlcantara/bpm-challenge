import http from 'http';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import index from './routes/index';
import requisitonRoute from './routes/requisitonRoute';
import userRoute from './routes/userRoute';
import authRoute from './auth/routes';
import { createDB } from './models/migration';

const app = express();
export const server = http.createServer(app);
/**
 * Configs
 */
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes Definition
 */
app.use('/', index);
app.use('/requisitions', requisitonRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

/**
 * DB Configs
 */
export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bpm"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    createDB();
});

export default app;