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

  static createPethouse(name, price) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pethouse (name,price) VALUES (?,?)",
        [name, price],
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

  static updatePethouse(id, name, price) {
    const updateSql = "UPDATE pethouse SET name = ?, price = ? WHERE id = ?";
    const values = [name, price, id];
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
