const { Schema, model } = require('mongoose')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
    },
    password: {
        type: String,
        minLength: 6,
    },
    googleAuth: {
        type: String,
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    cashInMonth: {
        type: Object
    },
    token: {
        type: String,
        default: null,
    }
    }, { versionKey: false, timeStamps: true })

const User = model('user', userSchema)

module.exports = User
