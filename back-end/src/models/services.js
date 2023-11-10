import connection from "../db";

export default class Services {
  static getAllServices() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM services", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getServicesById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createServices(name, description, price, image) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO services (name, description,image,price) VALUES (?, ?,?,?)",
        [name, description, price, image],
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

  static updateServices(id, name,image, description, price) {
    const updateSql =
      "UPDATE services SET name = ?,image = ?, description = ?, price = ? WHERE id = ?";
    const values = [name,image, description, price, id];
    return new Promise((resolve, reject) => {
      connection.query(updateSql, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static updateBlockService(id, is_delete) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE services SET is_delete = ? WHERE id = ?",
        [is_delete, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
