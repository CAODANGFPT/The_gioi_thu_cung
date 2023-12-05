import connection from "../db";
export default class Order {
  static getOrderUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, products.name AS orderName, products.price AS orderPrice, products.img AS orderIMG, detailOrder.quantity as quantity, detailOrder.price as priceProduct ,orders.total, orders.contact_information, orders.time, orders.note, status_order.name AS status_name FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id WHERE orders.user_id = ?;",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getAllOrder(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, products.name AS orderName, products.price AS orderPrice, products.img AS orderIMG, detailOrder.quantity as quantity, detailOrder.price as priceProduct ,orders.total, orders.contact_information, orders.time, orders.note, status_order.name AS status_name FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createOrder(user_id, total, contact_information, note) {
    const currentTime = new Date();
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(
          "INSERT INTO orders (user_id, total, contact_information, time, note, status_id) VALUES (?,?,?,?,?,1)",
          [user_id, total, contact_information, currentTime, note],
          (err, results) => {
            if (err) reject(err);
            resolve(results.insertId);
          }
        );
      });
    });
  }
}
