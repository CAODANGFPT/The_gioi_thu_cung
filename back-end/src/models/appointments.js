import connection from "../db";
export default class Appointments {
  static getAllAppointments() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM appointments", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getAppointmentsById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM appointments WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
  static getAppointmentsData() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointments.day, pets.name AS pet_name, " +
          "services.name_service AS service_name, users.email AS user_email, " +
          "pethouse.name AS pethouse_name, settime.name AS settime_name, " +
          "settime.start_time, settime.end_time, status.name AS status_name " +
          "FROM appointments " +
          "JOIN pets ON appointments.pet_id = pets.id " +
          "JOIN services ON appointments.services_id = services.id " +
          "JOIN users ON appointments.user_id = users.id " +
          "JOIN pethouse ON appointments.pethouse_id = pethouse.id " +
          "JOIN settime ON appointments.time_id = settime.id " +
          "JOIN status ON appointments.status_id = status.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createAppointments(
    day,
    pet_id,
    services_id,
    user_id,
    pethouse_id,
    time_id,
    status_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointments (day, pet_id, services_id, user_id, pethouse_id, time_id,status_id) VALUES (?,?, ?,?,?,?,?)",
        [day, pet_id, services_id, user_id, pethouse_id, time_id, status_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results && results.insertId) {
              resolve(results.insertId);
            } else {
              reject(new Error("Insert failed or no insertId returned."));
            }
          }
        }
      );
    });
  }
  static updateAppointments(
    id,
    day,
    pet_id,
    services_id,
    user_id,
    pethouse_id,
    time_id,
    status_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET day = ?, pet_id = ?,services_id = ?, user_id=?, pethouse_id = ?, time_id = ?,status_id = ? WHERE id = ?",
        [
          day,
          pet_id,
          services_id,
          user_id,
          pethouse_id,
          time_id,
          status_id,
          id,
        ],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteAppointments(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM appointments WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
