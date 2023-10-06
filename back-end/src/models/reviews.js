import connection from "../db";

export default class Reviews {
  static getListReviews() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM reviews", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getReview(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM reviews WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createReview(user_id, rating, comment, created_at, services_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO reviews (user_id, rating, comment, created_at, services_id) VALUES (?, ?, ?, ?, ?)",
        [user_id, rating, comment, created_at, services_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static deleteReviews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM reviews WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
