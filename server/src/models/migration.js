import uuidv4 from 'uuid/v4';

import { connection } from "../app";
import { REQUISITION_TABLE, USER_TABLE } from '../core/helpers';

export function createDB() {
    resetDB();

    createRequisitionTable();
    createUsersTable();
    addUsers();
}

function resetDB() {
    const sql = `DROP TABLE IF EXISTS ${REQUISITION_TABLE}, ${USER_TABLE};`

    connection.query(sql, (error) => {
        if (error) return console.log(error);
    });
}

function createRequisitionTable() {
    const sql =
        `CREATE TABLE IF NOT EXISTS ${REQUISITION_TABLE} (
            id VARCHAR(36) PRIMARY KEY NOT NULL,
            requester VARCHAR(180) NOT NULL,
            abdicator VARCHAR(180) NOT NULL,
            description VARCHAR(360),
            price DOUBLE(16,2),
            status VARCHAR(60) NOT NULL,
            createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

    connection.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Requisition Table created!');
    });
}

function createUsersTable() {
    const sql =
        `CREATE TABLE IF NOT EXISTS ${USER_TABLE} (
            id VARCHAR(36) PRIMARY KEY NOT NULL,
            name VARCHAR(360) NOT NULL,
            username VARCHAR(360) NOT NULL,
            password VARCHAR(360) NOT NULL,
            level VARCHAR(60) NOT NULL
        );`;

    connection.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Users Table created!');
    });
}

function addUsers() {
    const sql =
        `INSERT INTO ${USER_TABLE} (id, name, username, password, level)
        VALUES
        ('${uuidv4()}', 'Admin', 'admin@senior.com.br', 'admin', 'ADMIN'),
        ('${uuidv4()}', 'Nathan', 'nathan.alcantara@senior.com.br', 'batata', 'REQUESTER'),
        ('${uuidv4()}', 'Gabriel', 'gabriel.fischer@senior.com.br', 'batata', 'ABDICATOR')`;

    connection.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Users created!');
    });
}