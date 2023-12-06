import connection from "../db";
export default class Logo {
    static getAllLogo() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM logo", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getLogoById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM logo WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createLogo(img) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO logo (img) VALUES (?)",
                [img],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateLogo(id, img) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE logo SET img = ? WHERE id = ?",
                [img, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteLogo(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM logo WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
