import connection from "../db";

export default class Pethouse {
  static getAllPethouse() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM pethouse", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getPethouseById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pethouse WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createPethouse(name, quantity_pethouse, still_empty) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pethouse (name, quantity_pethouse, still_empty ) VALUES (?, ?, ?)",
        [name, quantity_pethouse, still_empty],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }

  static updatePethouse(id, name, quantity_pethouse, still_empty) {
    const updateSql =
      "UPDATE pethouse SET name = ?, quantity_pethouse = ?, still_empty WHERE id = ?";
    const values = [name, quantity_pethouse, still_empty, id];
    return new Promise((resolve, reject) => {
      connection.query(updateSql, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }


  static deletePethouse(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM pethouse WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
