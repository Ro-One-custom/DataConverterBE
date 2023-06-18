const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const session = require('express-session');
const flash = require('connect-flash');


const signupRoutes = require('./route/signupRoute')
const headerRoutes = require('./route/headersRoute')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

app.use(flash());
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


app.use('/auth', signupRoutes)
app.use('/header', headerRoutes)



module.exports = app