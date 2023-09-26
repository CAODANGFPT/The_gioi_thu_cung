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
  static getSetTime(id) {
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

  static createSetTime(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO settime (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateSetTime(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE settime SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteSetTime(id) {
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
