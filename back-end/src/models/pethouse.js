import connection from "../db";

export default class Pethouse {
  static getAllPethouse() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT pethouse.id as id, pethouse.name FROM pethouse", (err, results) => {
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

  static createPethouse(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pethouse (name, price) VALUES (?,1)",
        [name],
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

  static updatePethouse(id, name) {
    const updateSql = "UPDATE pethouse SET name = ? WHERE id = ?";
    const values = [name, id];
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
