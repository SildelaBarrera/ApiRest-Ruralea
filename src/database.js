const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:       process.env.DB_HOST         || "angular.ctw08waqu7zb.us-east-1.rds.amazonaws.com", 
    user:       process.env.DB_USER         || "admin",
    password:   process.env.DB_PASSWORD     || "Ruralea0605.",
    database:   process.env.DB_NAME         || "angular",
    port:       process.env.DB_PORT         || 3306
})

console.log("Conexion correcta");

module.exports = {connection};