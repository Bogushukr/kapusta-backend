const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const schemaCreateTransaction = Joi.object({
  desc: Joi.string()
      .max(30)
      .required(),
  value: Joi.number()
      .required()
      .integer(),
  cashIncome: Joi.boolean().required(),
  expenseCategories: Joi.string().default('null').required(),
  incomeCategories: Joi.string().default('null').required(),
  year: Joi.number().required(),
  month: Joi.number().required(),
  day: Joi.number().required()
})

const schemaSignUpSignIn = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required()
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
  },
  validationSignUpSignIn: (req, res, next) => {
    return validate(schemaSignUpSignIn, req.body, next)
  }
}
