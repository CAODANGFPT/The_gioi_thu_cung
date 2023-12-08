import connection from "../db";
export default class paymentMethods {
    static getAllPaymentMethods() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM paymentMethods", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
