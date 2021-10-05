const { Schema, model } = require('mongoose')

const transactionSchema = Schema({
    desc: {
        type: String,
        maxLength: 30,
    },
    cashIncome: {
        type: Boolean,
    },
    cashValue: {
        type: Number,
        default: 0,
    },
    expenseCategory: {
        type: String,
        default: null,
    },
    incomeCategory: {
        type: String,
        default: null,
    },
    year: {
        type: String,
    },
    month: {
        type: String,
    },
    day: {
        type: String,
    },
}, { versionKey: false, timeStamps: true })

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
