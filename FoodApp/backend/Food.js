const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    daySinceIate: {
        type: Number,
        required: true,
    },
})

const Food = mongoose.model('Food', foodSchema)
module.exports = Food