const mysql = require('mysql');
require('dotenv').config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "heloisecestmoi!",
    database: "groupomania"
});

db.connect(function (err) {

    if (err) throw err;

    console.log("Connecté à la base de données MySQL!");

});


module.exports = db;