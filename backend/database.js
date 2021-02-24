const mysql = require('mysql');
require('dotenv').config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "heloisecestmoi!",
    database: "groupomania"
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté a mysql ');
});


module.exports = db;