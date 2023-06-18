const express = require('express')
const router = express.Router()
var con = require('../dbConnection')




// adding file templates


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



router.get('/allfiles/:type', (req, res) => {

    const filetype = req.params.type

    const sql = `SELECT * FROM template WHERE template.fileType = "${filetype}" `
    con.query(sql, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                // console.log("Records retrieved")
                // console.log(result)
                return res.json({
                    message: "Records Retrieved",
                    fileTypeDetails: result
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


router.get('/allfiles', (req, res) => {

    // const filetype = req.params.type

    const sql = `SELECT * FROM template `
    con.query(sql, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                // console.log("Records retrieved")
                // console.log(result)
                return res.json({
                    message: "Records Retrieved",
                    fileTypeDetails: result
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

router.get('/allheaders', (req, res) => {

    const sql = `SELECT template.fileName , template.fileType , template.fileFormat , headers.headerValues FROM template INNER JOIN headers ON template.fileName = headers.fileName`
    con.query(sql, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                // console.log("Records retrieved")
                // console.log(result)
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
                // console.log("Records retrieved")
                const finalResult = JSON.parse(JSON.stringify(result))
                // console.log(finalResult)
                const filteredData = finalResult.filter((obj) => {
                    return (obj.fileName === filterkey || obj.fileType === filterkey)
                })
                // console.log(filteredData)
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


//  defining mapping

router.post('/addmapping', (req, res) => {

    const ipFile = req.body.ipFile
    const opFile = req.body.opFile
    const mappedHeaders = JSON.stringify(req.body.mappedHeaders)

    const sql = `INSERT INTO data_converter.mapping (ipFile, opFile, mappedHeaders) VALUES (? , ? , ?)`
    const values = [ipFile, opFile, mappedHeaders]
    console.log(mappedHeaders)
    con.query(sql, values, (err, result) => {
        if (!err) {
            if (!result.length !== 0) {
                console.log("Records Inserted")
                console.log(result)
                return res.json({
                    message: "Records Inserted",
                    headersDetails: result
                })
            } else {
                return res.json({
                    message: "No record imserted"
                })
            }
        } else {
            console.log("Records not inserted")
            return res.status(500).json({
                message: "Error inserting records",
                error: err
            })
        }
    })
})




router.get('/mapping/:name', (req, res) => {

    const fileName = req.params.name

    const sql = `SELECT * FROM data_converter.mapping WHERE mapping.ipFile = "${fileName}" OR mapping.opFile = "${fileName}" `
    con.query(sql, (err, result) => {
        const finalResult = JSON.parse(JSON.stringify(result))
        const data = finalResult[0].mappedHeaders
        const parsedData = JSON.parse(data)
        console.log(parsedData.Age)



        if (!err) {
            if (!result.length !== 0) {
                console.log("Records retrieved")

                return res.status(201).json({
                    data: finalResult,
                    mappedHeaders: parsedData
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



router.post('/usermapping', (req, res) => {

    const ipFileName = req.body.ipFileName
    const opFileName = req.body.opFileName

    const sql = `SELECT * FROM data_converter.mapping WHERE mapping.ipFile = "${ipFileName}" AND mapping.opFile = "${opFileName}" `
    con.query(sql, (err, result) => {
        const finalResult = JSON.parse(JSON.stringify(result))
        console.log(finalResult)
        const data = finalResult[0].mappedHeaders
        const parsedData = JSON.parse(data)


        if (!err) {
            if (!result.length !== 0) {
                console.log("Records retrieved")
                return res.json({
                    mappedHeaders: parsedData
                })


            } else {
                return res.json({
                    message: "No records found"
                })
            }
        } else {
            console.log(err)
            return res.status(500).json({
                message: "Error retrieving records",
                error: err
            })
        }
    })
})





module.exports = router