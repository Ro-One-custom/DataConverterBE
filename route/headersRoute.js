const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const File = require('../model/header')



router.post('/addheader', async (req, res) => {

    const file = new File({
        name: req.body.name,
        type:req.body.type,
        headers: req.body.headers
    })

    const result = await file.save()

    try {
        res.status(201).json({
            message: "Header Added",
            fileInfo: result
        })
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})


router.get('/allheaders', async (req, res) => {

    const headers = await File.find()

    try {
        res.status(201).json({
            AllHeaders: headers
        })
    } catch (err) {
        res.status(400).json(err)
    }
})



router.get('/allheaders/:name', async (req, res) => {

    const header = await File.findOne({ 'name': req.params.name })

    try {
        res.status(201).json({
            files: header
        })
    } catch (err) {
        res.status(400).json(err)
    }
})








module.exports = router