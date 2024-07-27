const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(03|05|07|08|09)\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid Vietnamese phone number!`
        },
    },
    role: {
        type: String,
        default: 'user'
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        age: {
            type: Number
        },
        address: [{
            type: String
        }]
    },
    refresh_token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', userSchema)