import connection from "../db";

export default class SetTime {
  static getListSetTime() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM settime", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdSetTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM settime WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addSetTime(name, time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO settime (name, time) VALUES (?, ?)",
        [name, time],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateSetTime(id, name, time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE settime SET name = ?, time = ? WHERE id = ?",
        [name, time, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeSetTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM settime WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
