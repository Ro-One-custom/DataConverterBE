const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Signup = require('../model/signup')

// user signup

router.post('/signup', async (req, res) => {

    const signup = new Signup({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: req.body.role

    })

    const profile = await signup.save()

    try {
        res.status(201).json({
            message:"Registration Successfull",
            userInfo: profile
        })
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }

})


// get all users

router.get('/allusers', async (req, res) => {

    const allUsers = await Signup.find()

    try {
        res.status(201).json({
            AllUsers: allUsers
        })
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})


// edit a user's details 

router.put('/editprofile/:email', async (req, res) => {

    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    }

    const profile = await Signup.findOneAndUpdate({ email: req.params.email }, { $set: data }, { new: true })

    try {
        res.status(201).json({
            message: "Profile Updated Successfully",
            updatedInfo: profile
        })
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})


// user signin 

router.post('/signin', async (req, res) => {

    const login = await Signup.find({ email: req.body.email })

    try {

        if (login[0].password === req.body.password) {
            res.status(201).json({
                message: "Login Successfull",
                profile:login
            })
        }

        else {
            res.status(500).json({ message: "Invalid password. Please check." })

        }
    } catch (err) {
        res.status(400).json({message:"Invalid email.Please check."})
    }
})


module.exports = router