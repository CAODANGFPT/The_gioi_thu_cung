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

  static updateServices(id, name, description, price) {
    const updateSql =
      "UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?";
    const values = [name, description, price, id];
    return new Promise((resolve, reject) => {
      connection.query(updateSql, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  

  static deleteServices(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM services WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
