const mongoose = require('mongoose')

const headerSchema = new mongoose.Schema({

    name: {
        type: String
    },

    type: {
        type: String
    },

    headers: [{
        type: String
    }],

    format: {
        type:String
    }

})



module.exports = mongoose.model('File', headerSchema)