import connection from "../db";

export default class Dashboard {
  static getDashboard(year, month) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(id) AS total_appointments, SUM(total) AS total_revenue FROM appointments WHERE appointments.status_payment = 2 AND appointments.status_id = 4 AND YEAR(appointments.start_time) = ? AND MONTH(appointments.start_time) = ?",
        [year, month],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
}
