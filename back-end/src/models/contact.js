import connection from "../db";
export default class Contact {
    static getAllContact() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM contact", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static getContactUser() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT contact.id, contact.title, contact.subject, contact.user_id, users.name as nameUser FROM contact JOIN  users on contact.user_id = users.id",
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
    static getContactById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM contact WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
    static createContact(title, subject, user_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO contact (title, subject, user_id) VALUES (?,?, ?)",
                [title, subject, user_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateContact(id, title, subject, user_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE contact SET title = ?, subject = ?, user_id=? WHERE id = ?",
                [title, subject, user_id, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteContact(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM contact WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}
