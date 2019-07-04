import { connection } from "../app";
import { USER_TABLE } from "../core/helpers";

/**
 * API to login on system
 * 
 * @param {String} username 
 * @param {String} password 
 */
export function login({ body }, res) {
    const { username, password } = body;
    let success = false;
    let output = { success };

    if (username && password) {
        const sql = `SELECT * FROM ${USER_TABLE} WHERE username = ?`;

        connection.query(sql, [username], (err, result) => {
            if (err) return res.status(500).send({ err });

            if (result.length > 0) {
                const { id, password: pass, level } = result[0];

                success = password === pass;

                output = Object.assign({ success }, { id, level });
            }
            res.status(200).send(output);
        });
    } else {
        res.status(422).send({ "err": "Parameters username and password is required!" });
    }
}