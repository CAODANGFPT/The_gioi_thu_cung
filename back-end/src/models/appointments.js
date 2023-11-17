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
          "services.name AS service_name, users.email AS user_email, " +
          "pethouse.name AS pethouse_name, settime.name AS settime_name, " +
          "settime.start_time, settime.end_time, status_appointment.name AS status_name " +
          "FROM appointments " +
          "JOIN pets ON appointments.pet_id = pets.id " +
          "JOIN services ON appointments.services_id = services.id " +
          "JOIN users ON appointments.user_id = users.id " +
          "JOIN pethouse ON appointments.pethouse_id = pethouse.id " +
          "JOIN settime ON appointments.time_id = settime.id " +
          "JOIN status_appointment ON appointments.status_id = status_appointment.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAppointmentUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointments.day, appointments.is_delete, pets.name AS pet_name, " +
          "services.name AS service_name, users.email AS user_email, " +
          "pethouse.name AS pethouse_name, settime.name AS settime_name, " +
          "settime.start_time, settime.end_time, status_appointment.name AS status_name " +
          "FROM appointments " +
          "JOIN pets ON appointments.pet_id = pets.id " +
          "JOIN services ON appointments.services_id = services.id " +
          "JOIN users ON appointments.user_id = users.id " +
          "JOIN pethouse ON appointments.pethouse_id = pethouse.id " +
          "JOIN settime ON appointments.time_id = settime.id " +
          "JOIN status_appointment ON appointments.status_id = status_appointment.id " +
          "WHERE appointments.user_id = ?",
        [id],
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
    start_time,
    end_time,
    total,
    status_id,
    is_delete
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointments (day, pet_id, services_id, user_id, pethouse_id, start_time, end_time, total,status_id) VALUES (?,?,?,?,?,?,?,?,1)",
        [
          day,
          pet_id,
          services_id,
          user_id,
          pethouse_id,
          start_time,
          end_time,
          total,
          status_id,
          is_delete,
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
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
        "UPDATE appointments SET day = ?, pet_id = ?, services_id = ?, user_id=?, pethouse_id = ?, time_id = ?,status_id = ? WHERE id = ?",
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
  static updateAppointmentStatus(id, status_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET status_id = ? WHERE id = ?",
        [status_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static cancelHistoryAppointment(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET is_delete = 1 WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAppointmentTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DISTINCT appointments.id, appointments.start_time, appointments.end_time FROM appointments JOIN pethouse ON appointments.pethouse_id = pethouse.id WHERE appointments.start_time >= CURRENT_DATE AND pethouse.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
