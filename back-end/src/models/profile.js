import connection from "../db";
export default class Profile {
    static getAllProfile() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM profile", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getProfileById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM profile WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
    static createProfile(logo, email, phone, fb) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO profile (logo, email, phone, fb) VALUES (?,?,?,?)",
                [logo, email, phone, fb],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateProfile(id, logo, email, phone, fb) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE profile SET logo = ?, email = ?, phone = ?, fb = ? WHERE id = ?",
                [logo, email, phone, fb, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteProfile(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM profile WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}
