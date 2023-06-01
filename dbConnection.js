var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "saanUser",
    password: "saan27",
    database: "data_converter"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "ALTER TABLE headers ADD CONSTRAINT fileName FOREIGN KEY (fileName) REFERENCES template (fileName) ON DELETE CASCADE;"
    // // var sql = "ALTER TABLE template ADD INDEX idx_headers (headers)"   // to add the index . 
    // con.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log("Qurey Executed")
    // })
});


module.exports = con;