const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../model/')
const { HttpCode, status } = require('../../helpers/constants')

const reg = async (req, res) => {
  const { name, email, password } = req.body
  const userInList = await User.findOne({ email })
  if (userInList) {
    return res.status(HttpCode.CONFLICT).json({
      status: status.FAIL,
      code: HttpCode.CONFLICT,
      message: 'Email in use'
    })
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const { JWT_KEY } = process.env
  const token = jwt.sign(password, JWT_KEY)
  await User.create({ name, email, password: hashPassword, token })

  res.status(HttpCode.CREATED).json({
    status: status.SUCCESS,
    code: 201,
    message: 'Success register',
    user: {
      name,
      email
    },
    token
  })
}

module.exports = reg
