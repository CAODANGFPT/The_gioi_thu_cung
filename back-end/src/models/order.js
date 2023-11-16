import connection from "../db";
const now = new Date();
export default class Order {
  static getOrderUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT orders.id, products.name AS orderName, products.price AS orderPrice, products.img AS orderIMG ,orders.quantityOrder ,orders.totalOrders, orders.contact_information, orders.time, orders.note, status_order.name AS status_name FROM orders  JOIN products ON orders.product_id = products.id  JOIN status_order ON orders.status_id = status_order.id WHERE orders.user_id = ?;",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static createOrder(
    user_id,
    products,
    totalOrders,
    contact_information,
    note
  ) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }
        const insertState = products.map((product) => {
          return [
            user_id,
            product.product_id,
            product.quantityOrder,
            totalOrders,
            contact_information,
            now,
            note,
            1,
          ];
        });

        connection.query(
          "INSERT INTO orders (user_id, product_id, quantityOrder, totalOrders, contact_information, time, note, status_id) VALUES ?",
          [insertState],
          (err, results) => {
            if (err) {
              console.error("Lỗi", err);
              connection.rollback(() => {
                reject(err);
              });
              return;
            }

            const orderIds = results.insertIds;

            const userIds = Array(products.length).fill(user_id);

            connection.query(
              "DELETE FROM carts WHERE user_id IN (?)",
              [userIds],
              (err) => {
                if (err) {
                  console.error("Error", err);
                  connection.rollback(() => {
                    reject(err);
                  });
                  return;
                }

                connection.commit((err) => {
                  if (err) {
                    console.error("Error", err);
                    connection.rollback(() => {
                      reject(err);
                    });
                  } else {
                    console.log("success.");
                    resolve(orderIds);
                  }
                });
              }
            );
          }
        );
      });
    });
  }
}
