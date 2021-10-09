const { Schema, model } = require('mongoose')

const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: emailRegexp
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6
        },
        googleAuth: {
            type: String
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
            default: null
        }
    },

    { versionKey: false, timestamps: true }
)



const User = model('user', userSchema)

module.exports = User
