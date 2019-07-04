import uuidv4 from 'uuid/v4';

import { connection } from "../app";
import { REQUISITION_TABLE } from '../core/helpers';

/**
 * Create a new requisition on base a requester
 * 
 * @param {String} requester 
 * @param {String} description 
 * @param {Number} price 
 */
export function addRequisition({ body }, res) {
    const { requester, description = null, price = null } = body;

    if (requester) {
        const sql = `INSERT INTO ${REQUISITION_TABLE} (id, requester, description, price) VALUES (?, ?, ?, ?)`;

        connection.query(sql, [uuidv4(), requester, description, price], (err) => {
            if (err) return res.status(500).send({ err });

            res.status(201).send({ success: "Request made successfully!" });
        });
    } else {
        res.status(422).send({ "err": "Parameter requester is required!" });
    }
}

/**
 * List all requisitions of a requester
 * 
 * @param {String} requester 
 */
export function listRequisitions({ body }, res) {
    const { requester } = body;

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