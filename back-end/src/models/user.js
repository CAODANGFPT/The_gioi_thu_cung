import connection from "./../db";

export default class User {
  static createUser(name, email, password, phone, address, img) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users (name, email, password, role_id , phone, address, img) VALUES (?, ?, ?, 2, ?, ?, 5)",
        [name, email, password, phone, address, img],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      connection.query(query, [email], (err, results) => {
          if (err) reject(err);
          resolve(results.length > 0 ? results[0] : null);
      });
    });
  }
  static checkEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}
