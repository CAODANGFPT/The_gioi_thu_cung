import connection from "../db";
export default class Order {
  static getOrderUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, users.id as userId,users.name as userName,products.id AS productId, products.name AS productsName, detailOrder.price AS productPrice, products.img AS productImg, detailOrder.quantity as quantity,orders.total, orders.contact_information, orders.time, orders.note, status_order.name AS status_name FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id JOIN users ON orders.user_id = users.id WHERE orders.user_id = ?;",
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
        "SELECT orders.id, users.id as userId,users.name as userName,products.id AS productId, products.name AS productsName, detailOrder.price AS productPrice, products.img AS productImg, detailOrder.quantity as quantity,orders.total, orders.contact_information, orders.time, orders.note, status_order.name AS status_name FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id JOIN users ON orders.user_id = users.id",
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

  static updateStatusOrder(id, status_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE orders SET status_id = ? WHERE id = ?",
        [status_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
}
