import connection from "../db";
export default class Order {
  static getOrderUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, users.id as userId,users.name as userName,products.id AS productId, products.name AS productName, detailOrder.price AS productPrice, products.img AS productImg, detailOrder.quantity as quantity,orders.total, orders.time, orders.note, status_order.name AS status_name,status_order.id AS status_id, orders.paymentMethods_id AS paymentMethods_id, paymentMethods.name AS paymentMethods_name,paymentMethods.image AS paymentMethods_image, delivery_address.name AS addressName, delivery_address.phone AS addressPhone, delivery_address.id AS addressId, delivery_address.address AS address, orders.status_payment AS status_payment_id, status_payment.name AS status_payment_name  FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id JOIN users ON orders.user_id = users.id JOIN paymentMethods ON orders.paymentMethods_id = paymentMethods.id JOIN delivery_address ON orders.address_id = delivery_address.id JOIN status_payment ON orders.status_payment = status_payment.id WHERE orders.user_id = ?;",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getAllOrder() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, users.id as userId,users.name as userName,products.id AS productId, products.name AS productName, detailOrder.price AS productPrice, products.img AS productImg, detailOrder.quantity as quantity,orders.total, orders.time, orders.note, status_order.name AS status_name,status_order.id AS status_id, orders.paymentMethods_id AS paymentMethods_id, paymentMethods.name AS paymentMethods_name,paymentMethods.image AS paymentMethods_image, delivery_address.name AS addressName, delivery_address.phone AS addressPhone, delivery_address.id AS addressId, delivery_address.address AS address, orders.status_payment AS status_payment_id, status_payment.name AS status_payment_name  FROM orders JOIN detailOrder ON orders.id = detailOrder.orderId JOIN products ON detailOrder.productId = products.id JOIN status_order ON orders.status_id = status_order.id JOIN users ON orders.user_id = users.id JOIN paymentMethods ON orders.paymentMethods_id = paymentMethods.id JOIN delivery_address ON orders.address_id = delivery_address.id JOIN status_payment ON orders.status_payment = status_payment.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createOrder(
    user_id,
    total,
    note,
    paymentMethods_id,
    status_payment,
    address_id,
    status_id
  ) {
    const currentTime = new Date();
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(
          "INSERT INTO orders (user_id, total, time, note, status_id,paymentMethods_id,status_payment, address_id) VALUES (?,?,?,?,?,?,?,?)",
          [
            user_id,
            total,
            currentTime,
            note,
            paymentMethods_id,
            status_payment,
            address_id,
            status_id
          ],
          (err, results) => {
            if (err) reject(err);
            resolve(results?.insertId);
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
