const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number
    },
    image: [{
        type: String
    }],
    description: {
        type: String
    },
    detail_product: {
        supplier: {
            type: String
        },
        publisher: {
            type: String
        },
        Cover_form: {
            type: String
        },
        author: {
            type: String
        }
    },
    status: {
        type: Number,
        default: 1
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Product', productSchema)