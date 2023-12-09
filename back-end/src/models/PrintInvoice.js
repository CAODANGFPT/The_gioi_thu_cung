import connection from "./../db";

export default class PrintInvoice {
  static getIDInvoice(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT Invoice.id, users.name AS nameInvoice, Invoice.date,Invoice.amount,Invoice.paymentMethod,Invoice.appointments_id FROM Invoice JOIN users ON Invoice.user_id = users.id WHERE Invoice.appointments_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static addInvoice(user_id, amount, paymentMethod, appointments_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Invoice (user_id, date, amount, paymentMethod, appointments_id ) VALUES (?,  NOW(), ?, ?, ?)",
        [user_id, amount, paymentMethod, appointments_id],
        (err, results) => {
          if (err) {
            console.error("Error inserting :", err);
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }

  static updateStatusCash(appointments_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET status_payment = 2 WHERE id = ?",
        [appointments_id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static getInvoiceByAppointmentID(appointments_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id, user_id, date, amount, paymentMethod, appointments_id FROM Invoice WHERE appointments_id = ?",
        [appointments_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
