import connection from "../db";

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

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
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

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getAllUsersRole() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.id, user.email,user.phone,user.name,user.img, user.role_id, role.name as nameRole FROM user JOIN  role on user.role_id = role.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static resetPassword(email, password) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET password = ? WHERE email = ?",
        [password, email],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static updateUserRole(id, role_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET role_id = ? WHERE id = ?",
        [role_id, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
