import { connection } from "../app";
import { USER_TABLE } from "../core/helpers";

/**
 * Get one user
 *
 * @param {UUID} id
 */
export function getUser({ headers }, res) {
  const { id } = headers;

  if (id) {
    const sql = `SELECT * FROM ${USER_TABLE} WHERE id = ?`;

    connection.query(sql, [id], (err, result) => {
      if (err) return res.status(500).send({ err });

      console.log("User find")

      if (result.length > 0) {
        delete result[0].password;
        res.status(200).send(result[0]);
      } else {
        res.status(204).send({ message: `User not find with id ${id}` });
      }
    });
  } else {
    res.status(422).send({ err: "Parameter id is required!" });
  }
}