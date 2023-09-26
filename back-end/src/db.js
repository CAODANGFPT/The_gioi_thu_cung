import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "103.252.137.160",
  user: "hduchoangmobilec_duchoang",
  port: 3306,
  password: "Trc%QIaJ+!3j",
  database: "hduchoangmobilec_duchoang",
});

export default connection;
