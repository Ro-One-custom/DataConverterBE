var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "saanUser",
    password: "saan27",
    database:"data_converter"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    // con.query("CREATE DATABASE templates", (err, result) => {
    //     if (err) throw err;
    //     console.log("Database Created")
    // })
});


module.exports = con;