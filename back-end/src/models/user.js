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
      connection.query("SELECT * FROM users", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getAllUsersRole() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT users.id, users.email,users.phone,users.name,users.img, users.role_id, users.is_delete, role.name as nameRole FROM users JOIN  role on users.role_id = role.id",
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
        "UPDATE users SET password = ? WHERE email = ?",
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
        "UPDATE users SET role_id = ? WHERE id = ?",
        [role_id, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static updateBlockUser(id, is_delete) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET is_delete = ? WHERE id = ?",
        [is_delete, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
