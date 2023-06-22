const express = require('express')
const router = express.Router()
var con = require('../dbConnection')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');

router.use(flash());
router.use(express.json());

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cors());
router.use(session({
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));





// Mysql queries --- 

// user signup

router.post('/signup', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const role = req.body.role;
    const department = req.body.department;

    const sql = `INSERT INTO data_converter.signup_data (firstName,lastname,email,password,mobile,role,department) VALUES ("${firstName}" , "${lastName}" , "${email}" , "${password}" , "${mobile}",  "${role}",  "${department}")`
    con.query(sql, (err, result) => {
        if (!err) {
            console.log("Record Inserted")
            return res.json({
                message: "Record Inserted",
                details: result
            })
        } else {
            console.log("Record not inserted")
            return res.status(500).json({
                message: "Record not inserted",
                error: err
            })
        }
    })

    return;

})


// get all users data

router.get('/allusers', (req, res) => {
    const sql = `SELECT * FROM  data_converter.signup_data`
    con.query(sql, (err, result) => {
        if (!err) {
            console.log("Records retrieved")
            return res.json({
                message: "Records Retrieved",
                details: result
            })
        } else {
            console.log("Records not  retrived")
            return res.status(500).json({
                message: "Error retrieving records",
                error: err
            })
        }
    })
})


router.get('/allusers/:name', (req, res) => {

    const key = req.params.name

    const sql = `SELECT * FROM  data_converter.signup_data WHERE email = "${key}"`
    con.query(sql, (err, result) => {
        if (!err) {
            console.log("Records retrieved")
            return res.json({
                message: "Records Retrieved",
                details: result
            })
        } else {
            console.log("Records not  retrived")
            return res.status(500).json({
                message: "Error retrieving records",
                error: err
            })
        }
    })
})


// user signin


router.post('/signin', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const sql = `SELECT * FROM  data_converter.signup_data WHERE email = "${email}"`
    con.query(sql, (err, result) => {
        console.log(result)
        const data = JSON.parse(JSON.stringify(result))
        if (!err) {
            console.log(data)
            if(data.length === 0 ){
                return res.json({
                    message: "Please check your email"
                })
            }else{
            if (data[0].password === password) {
                return res.json({
                    message: "Record Found and Login Successfull",
                    details: data
                })
            } else {
                return res.json({
                    message: "Please check your password"
                })
            }}
        } else {
            console.log("Records not  found")
            return res.status(500).json({
                message: "Error retrieving record",
                error: err
            })
        }
    })

})




router.put('/editprofile', (req, res) => {
    con.query('UPDATE `signup_data` SET `firstName`=?,`lastName`=?,`password`=?,`mobile`=? where `email`=?',
        [req.body.firstName, req.body.lastName, req.body.password, req.body.mobile, req.body.email],
        (err, result, fields) => {
            if (!err) {
                var data = JSON.parse(JSON.stringify(result));
                var updatedata = data
                console.log(updatedata)
                res.status(200).json({
                    data: updatedata,
                    message: "Data Updated"
                })
                console.log('Data is updated');
            } else {
                res.status(400).json({
                    message: err
                })
            }
        });
})



module.exports = router