const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const File = require('../model/header')
var con = require('../dbConnection')



// router.post('/addheader', async (req, res) => {

//     const file = new File({
//         name: req.body.name,
//         type:req.body.type,
//         headers: req.body.headers
//     })

//     const result = await file.save()

//     try {
//         res.status(201).json({
//             message: "Header Added",
//             fileInfo: result
//         })
//     } catch (err) {
//         res.status(400).json(err)
//         console.log(err)
//     }
// })


// router.get('/allheaders', async (req, res) => {

//     const headers = await File.find()

//     try {
//         res.status(201).json({
//             AllHeaders: headers
//         })
//     } catch (err) {
//         res.status(400).json(err)
//     }
// })



// router.get('/allheaders/:name', async (req, res) => {

//     const header = await File.findOne({ 'name': req.params.name })

//     try {
//         res.status(201).json({
//             files: header
//         })
//     } catch (err) {
//         res.status(400).json(err)
//     }
// })



router.post('/addheader', (req, res) => {

    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const fileFormat = req.body.fileFormat;
    const headersArray = req.body.headersArray


    const templateQuery = `INSERT INTO template (fileName, fileType, fileFormat) VALUES ("${fileName}" , "${fileType}" , "${fileFormat}")`;

    con.query(templateQuery, (err, templateResult) => {
        if (err) {
            console.error("Error inserting record in Template table:", err);
            return res.status(500).json({ message: "Error inserting record in Template table" });
        }

        console.log("Record inserted in Template table");

        const headerValues = headersArray.map(header => [fileName, header.headerValue]);
        const headerQuery = `INSERT INTO headers (fileName, headerValues) VALUES ?`;
        console.log(headerValues)

        con.query(headerQuery, [headerValues], (err, headerResult) => {
            if (err) {
                console.error("Error inserting record in Headers table:", err);
                return res.status(500).json({ message: "Error inserting record in Headers table", err });
            }

            console.log("Records inserted in Headers table");
            return res.json({ message: "Records inserted successfully", headerValues });
        });
    });
});




router.get('/allheaders', (req, res) => {

    const sql = `SELECT template.fileName , template.fileType , template.fileFormat , headers.headerValues FROM template INNER JOIN headers ON template.fileName = headers.fileName`
    con.query(sql, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                console.log("Records retrieved")
                console.log(result)
                return res.json({
                    message: "Records Retrieved",
                    headersDetails: result
                })
            } else {
                return res.json({
                    message: "No records found"
                })
            }
        } else {
            console.log("Records not  retrived")
            return res.status(500).json({
                message: "Error retrieving records",
                error: err
            })
        }
    })
})





router.get('/allheaders/:name', (req, res) => {

    const filterkey = req.params.name

    const sql = `SELECT template.fileName , template.fileType , template.fileFormat , headers.headerValues FROM template INNER JOIN headers ON template.fileName = headers.fileName`
    con.query(sql, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                console.log("Records retrieved")
                const finalResult = JSON.parse(JSON.stringify(result))
                console.log(finalResult)
                const filteredData = finalResult.filter((obj) => {
                    return (obj.fileName === filterkey || obj.fileType === filterkey)
                })
                console.log(filteredData)
                return res.json({
                    message: "Records Retrieved",
                    headersDetails: filteredData
                })
            } else {
                return res.json({
                    message: "No records found"
                })
            }
        } else {
            console.log("Records not  retrived")
            return res.status(500).json({
                message: "Error retrieving records",
                error: err
            })
        }
    })
})




module.exports = router