const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


const signupRoutes = require('./route/signupRoute')
const headerRoutes = require('./route/headersRoute')

mongoose.connect('mongodb+srv://SaankhyaKatari:SaankhyaKatari27@mongodb-practice.xhgwvkd.mongodb.net/DataConversion?retryWrites=true&w=majority')
mongoose.set("strictQuery", true);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))


app.use('/', signupRoutes)
app.use('/header', headerRoutes)



module.exports = app