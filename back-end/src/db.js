import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "mysql-147290-0.cloudclusters.net",
  port: 18579,
  user: "admin",
  password: "D2LGYtG5",
  database: "duantotnghiep",
});

export default connection;
