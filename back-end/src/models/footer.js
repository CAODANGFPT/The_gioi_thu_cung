import connection from "../db";
export default class Footer {
    static getAllFooter() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM footer", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getFooterById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM footer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createFooter(logo, slogan, send_email, content, license) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO footer (logo, slogan, send_email, content, license) VALUES (?, ?, ?, ?, ?)",
                [logo, slogan, send_email, content, license],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateFooter(id, logo, slogan, send_email, content, license) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE footer SET logo = ?, slogan = ?, send_email = ?, content = ?, license = ? WHERE id = ?",
                [logo, slogan, send_email, content, license, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteFooter(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM footer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
