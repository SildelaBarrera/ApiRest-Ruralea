const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:       process.env.DB_HOST         || "localhost",
    user:       process.env.DB_USER         || "root",
    password:   process.env.DB_PASSWORD     || "ruralea0605",
    database:   process.env.DB_NAME         || "angular",
    port:       process.env.DB_PORT         || 3306
})

console.log("Conexion correcta");

module.exports = {connection};