const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
// const Signup = require('../model/signup')
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

// user signup

// router.post('/signup', async (req, res) => {

//     const signup = new Signup({

//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         password: req.body.password,
//         role: req.body.role

//     })

//     const profile = await signup.save()

//     try {
//         res.status(201).json({
//             message:"Registration Successfull",
//             userInfo: profile
//         })
//     } catch (err) {
//         res.status(400).json(err)
//         console.log(err)
//     }

// })


// get all users

// router.get('/allusers', async (req, res) => {

//     const allUsers = await Signup.find()

//     try {
//         res.status(201).json({
//             AllUsers: allUsers
//         })
//     } catch (err) {
//         res.status(400).json(err)
//         console.log(err)
//     }
// })


// edit a user's details 


// router.put('/editprofile/:email', async (req, res) => {

//     const data = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         password: req.body.password
//     }

//     const profile = await Signup.findOneAndUpdate({ email: req.params.email }, { $set: data }, { new: true })

//     try {
//         res.status(201).json({
//             message: "Profile Updated Successfully",
//             updatedInfo: profile
//         })
//     } catch (err) {
//         res.status(400).json(err)
//         console.log(err)
//     }
// })


// user signin 

// router.post('/signin', async (req, res) => {

//     const login = await Signup.find({ email: req.body.email })

//     try {

//         if (login[0].password === req.body.password) {
//             res.status(201).json({
//                 message: "Login Successfull",
//                 profile:login
//             })
//         }

//         else {
//             res.status(500).json({ message: "Invalid password. Please check." })

//         }
//     } catch (err) {
//         res.status(400).json({message:"Invalid email.Please check."})
//     }
// })





// Mysql queries --- 

// user signup

router.post('/signup', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const role = req.body.role

    const sql = `INSERT INTO data_converter.signup_data (firstName,lastname,email,password,mobile,role) VALUES ("${firstName}" , "${lastName}" , "${email}" , "${password}" , "${mobile}",  "${role}")`
    con.query(sql, (err, result) => {
        if (!err) {
            console.log("Record Inserted")
            return res.json({
                message: "Record Inserted",
                details: data
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


// user signin


router.post('/signin', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const sql = `SELECT * FROM  data_converter.signup_data WHERE email = "${email}"`
    con.query(sql, (err, result) => {
        const data = JSON.parse(JSON.stringify(result))
        if (!err) {
            console.log(data)
            if (data[0].password === password) {
                return res.json({
                    message: "Record Found and Login Successfull",
                    details:data
                })
            } else {
                return res.json({
                    message: "Records Found but check your password"
                })
            }
        } else {
            console.log("Records not  found")
            return res.status(500).json({
                message: "Error retrieving record",
                error: err
            })
        }
    })

})




module.exports = router