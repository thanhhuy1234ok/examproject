const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Category', categorySchema)