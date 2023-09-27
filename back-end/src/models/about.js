import connection from "../db";

export default class SetTime {
  static getAbout(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM about WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createAbout(image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO about (image,description) VALUES (?,?)",
        [image, description],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateAbout(id, image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE about SET image = ? , description = ? WHERE id = ?",
        [image, description, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
}
