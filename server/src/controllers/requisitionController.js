import uuidv4 from 'uuid/v4';

import { connection } from "../app";
import { REQUISITION_TABLE, USER_TABLE } from '../core/helpers';

/**
 * Create a new requisition on base a requester
 *
 * @param {String} requester
 * @param {String} description
 * @param {Number} price
 */
export function addRequisition({ body }, res) {
    const { requester, description = null, price = null, status = "WAITING" } = body;

    if (requester) {
        const sql = `SELECT * FROM ${USER_TABLE} WHERE level = 'ABDICATOR'`;

        connection.query(sql, (err, result) => {
            if (err) return res.status(500).send({ err });

            if (result.length > 0) {
                const abdicator = result[0].id;
                const sql = `INSERT INTO ${REQUISITION_TABLE} (id, requester, abdicator, description, price, status) VALUES (?, ?, ?, ?, ?, ?)`;

                connection.query(sql, [uuidv4(), requester, abdicator, description, price, status], (err) => {
                    if (err) return res.status(500).send({ err });

                    res.status(201).send({ success: "Request made successfully!" });
                });
            } else {
                return res.status(500).send({ err: "There aren't nobody with permission to accept any requisition" });
            }
        });

    } else {
        res.status(422).send({ "err": "Parameter requester is required!" });
    }
}

/**
 * Get one requisition
 *
 * @param {UUID} id
 */
export function getRequisition({ headers }, res) {
    const { id } = headers;

    if (id) {
        const sql = `SELECT * FROM ${REQUISITION_TABLE} WHERE id = ?`;

        connection.query(sql, [id], (err, result) => {
            if (err) return res.status(500).send({ err });

            console.log("Requisition find")

            if (result.length > 0) {
                res.status(200).send(result[0]);
            } else {
                res.status(204).send({ message: `Requisition not find with id ${id}` });
            }
        });
    } else {
        res.status(422).send({ err: "Parameter id is required!" });
    }
}

/**
 *  Accept a requisition
 *
 * @param {String} status
 * @param {String} abdicator
 * @param {String} requester
 */
export function acceptRequisition({ body }, res) {
    const { status = 'ACCEPT', abdicator, requester } = body;

    if (abdicator && requester) {
        const sql = `
            UPDATE ${REQUISITION_TABLE}
            SET status = ?
            WHERE abdicator = ?
            AND requester = ?
        `

        connection.query(sql, [status, abdicator, requester], (err) => {
            if (err) return res.status(500).send({ err });

            res.status(200).send({ message: `Requisition accepted successfully` });
        });
    } else {
        res.status(422).send({ err: "Parameter abdicator and requester are required!" });
    }
}

/**
 * List all requisitions of a requester
 *
 * @param {String} requester
 */
export function listRequisitions({ headers }, res) {
    const { requester } = headers;

    if (requester) {
        const sql = `SELECT * FROM ${REQUISITION_TABLE} WHERE requester = ?`;

        connection.query(sql, [requester], (err, result) => {
            if (err) return res.status(500).send({ err });

            res.status(200).send(result);
        });
    } else {
        res.status(422).send({ "err": "Parameter requester is required!" });
    }
}

/**
 * List all requisitions
 */
export function listAllRequisitions(req, res) {
    const sql = `SELECT * FROM ${REQUISITION_TABLE}`;

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).send({ err });

        res.status(200).send(result);
    });
}