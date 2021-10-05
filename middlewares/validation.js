const Joi = require('joi')
const { HttpCode } = require('./helpers/constants')
// const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const schemaCreateTransaction = Joi.object({
    desc: Joi.string()
        .max(30)
        .required(),
    cashIncome: Joi.boolean(),
    cashValue: Joi.number()
        .required()
        .integer(),
    expenseCategories: Joi.string()
        .default(null),
    incomeCategories: Joi.string()
        .default(null),
    year: Joi.number(),
    month: Joi.number(),
    day: Joi.number()
})



const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (err) {
        next({
            status: HttpCode.BAD_REQUEST,
            message: err.message
        })
    }
}

module.exports = {
    validationCreateTransaction: (req, res, next) => {
        return validate(schemaCreateTransaction, req.body, next)
    }
}
