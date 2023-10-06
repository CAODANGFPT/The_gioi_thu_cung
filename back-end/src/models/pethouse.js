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

  static createPethouse(name, status_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pethouse (name,status_id) VALUES (?, ?)",
        [name, status_id],
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

  static updatePethouse(id, name, status_id) {
    const updateSql =
      "UPDATE pethouse SET name = ?, status_id = ? WHERE id = ?";
    const values = [name, status_id , id];
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
