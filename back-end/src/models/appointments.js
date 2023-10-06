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
    static createAppointments(day, pet_id, services_id, user_id, pethouse_id, time_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO appointments (day, pet_id, services_id, user_id, pethouse_id, time_id) VALUES (?,?, ?,?,?,?)",
                [day, pet_id, services_id, user_id, pethouse_id, time_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateAppointments(id, day, pet_id, services_id, user_id, pethouse_id, time_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE appointments SET day = ?, pet_id = ?,services_id = ?, user_id=?, pethouse_id = ?, time_id = ? WHERE id = ?",
                [day, pet_id, services_id, user_id, pethouse_id, time_id, id],
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