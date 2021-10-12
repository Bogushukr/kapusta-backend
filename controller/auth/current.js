const { User } = require('../../model');
const { HttpCode, status } = require('../../helpers/constants')

const current = async (req, res) => {
  const { token } = req.user;
  const { name, email, currentBalance } = await User.findOne({ token })

  res.json({
    status: status.SUCCESS,
    code: HttpCode.OK,
    data: {
      name, email, currentBalance
    },
  })
}

module.exports = current
