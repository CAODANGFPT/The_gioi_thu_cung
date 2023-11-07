import connection from "../db";
export default class Profile {
    static getAllMenu() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM menu", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getMenuById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM menu WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
    static createMenu(name, link) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO menu (name, link) VALUES (?,?)",
                [name, link],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateMenu(id, name, link) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE menu SET  name = ?, link = ? WHERE id = ?",
                [name, link, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteMenu(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM menu WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}
