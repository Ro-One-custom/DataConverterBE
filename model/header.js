const mongoose = require('mongoose')


const headerArrSchema = new mongoose.Schema({

    header: { type: String }
})

const headerSchema = new mongoose.Schema({

    name: {
        type: String
    },

    type: {
        type: String
    },

    headers: [{
        type: String
    }]

})



module.exports = mongoose.model('File', headerSchema)