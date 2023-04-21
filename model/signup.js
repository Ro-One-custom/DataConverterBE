const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },

    mobile: {
        type: Number
    },

    password: {
        type: String
    },

    role: {
        type: String
    }
})

module.exports = mongoose.model('Signup', signupSchema)