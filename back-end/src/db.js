import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "103.252.137.160",
  port: 3306,
  user: "hduchoangmobilec_thegioithucung",
  password: "thegioithucung",
  database: "hduchoangmobilec_duantotnghiep",
});

export default connection;
