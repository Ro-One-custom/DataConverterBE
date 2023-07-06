const express = require('express')
const router = express.Router()
var con = require('../dbConnection')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const nodemailer = require('nodemailer')

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
            return res.json({
                message: "Record Inserted",
                details: result
            })
        } else {
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
            return res.json({
                message: "Records Retrieved",
                details: result
            })
        } else {
            ("Records not  retrived")
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
            ("Records retrieved")
            return res.json({
                message: "Records Retrieved",
                details: result
            })
        } else {
            ("Records not  retrived")
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
        const data = JSON.parse(JSON.stringify(result))
        if (!err) {
            if (data.length === 0) {
                return res.status(201).json({
                    message: "Please check your email"
                })
            } else {
                if (data[0].password === password) {
                    return res.status(200).json({
                        message: "Record Found and Login Successfull",
                        details: data
                    })
                } else {
                    return res.status(202).json({
                        message: "Please check your password"
                    })
                }
            }
        } else {
            ("Records not  found")
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
                    (updatedata)
                res.status(200).json({
                    data: updatedata,
                    message: "Data Updated"
                })
                    ('Data is updated');
            } else {
                res.status(400).json({
                    message: err
                })
            }
        });
})




router.delete('/delteuser/:mobile', async (req, res) => {
    const mblNo = (req.params.mobile)
    con.query('DELETE FROM signup_data WHERE `mobile`=?', mblNo, function (err, results, fields) {
        if (!err) {
            var data = JSON.parse(JSON.stringify(results));
            var deletedata = data
            console.log(deletedata)
            res.status(200).json({
                data: deletedata,
                message: "Data Deleted"
            })
            console.log('Data is Deleted');
        } else {
            res.status(400).json({
                message: err
            })
        }
    });
});


router.post('/contactus', (req, res, next) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: 'jayadeepsaim@gmail.com',
            pass: 'ysezntzlhcaswzlb'
        }

    })
    var mailOptions = {

        from: 'jayadeepsaim@gmail.com',
        to: 'jayadeepsaim@gmail.com',
        subject: "Queries",
        text: req.body.text,

    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return (err);
        }
        else {
            ("Email Sent" + info.response)
        }
    })

});


module.exports = router