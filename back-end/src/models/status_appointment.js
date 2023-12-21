import connection from "../db";

export default class Status {
  static getListStatus() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status_appointment", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStatus(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM status_appointment WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
  static getStatusNameById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT name FROM status_appointment WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Kiểm tra xem có kết quả trả về hay không
            if (results && results.length > 0) {
              resolve(results[0].name);
            } else {
              resolve(null); // hoặc có thể trả về một giá trị mặc định nếu không có kết quả
            }
          }
        }
      );
    });
  }
  static addStatus(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO status_appointment (name) VALUES (?)",
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
        "UPDATE status_appointment SET name = ? WHERE id = ?",
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
        "DELETE FROM status_appointment WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
