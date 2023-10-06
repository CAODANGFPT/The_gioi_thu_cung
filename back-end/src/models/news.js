import connection from "../db";

export default class News {
  static getListNews() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM news", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getNews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createNews(img, title, description, created_at, user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO news (img,title, description, created_at, user_id) VALUES (?,?,?,?,?)",
        [img, title, description, created_at, user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateNews(id, img, title, description, created_at, user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE news SET img = ?, title = ?, description = ?, created_at=?, user_id=? WHERE id = ?",
        [img, title, description, created_at, user_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteNews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
