const bcrypt = require('bcryptjs')
const { User } = require('../../model/')
const { HttpCode, status } = require('../../helpers/constants')

const reg = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: status.FAIL,
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    })
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword })
  res.status(HttpCode.CREATED).json({
    status: status.SUCCESS,
    code: 201,
    message: 'Success register',
  })
}

module.exports = reg
