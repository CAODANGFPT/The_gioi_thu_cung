import connection from "../db";

export default class Status {
  static getListStatus() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStatus(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM status WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addStatus(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO status (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateStatus(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeStatus(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM status WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
