import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "103.252.137.187",
  user: "hduchoangmobilec_thegioithucung",
  port: 3306,
  password: "thegioithucung",
  database: "hduchoangmobilec_duantotnghiep",
});
export default connection;
