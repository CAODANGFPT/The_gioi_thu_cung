import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  port: 3306,
  user: "sql12649048",
  password: "5l17yNeUZp",
  database: "sql12649048",
});
export default connection;
