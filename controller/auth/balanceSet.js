const { User } = require('../../model')
const { HttpCode, status } = require('../../helpers/constants')

const balanceSet = async (req, res) => {
  const { token } = req.user
  const currentBalance = req.body.currentBalance || 0

  const newBalance = await User.updateOne(
    { token },
    { currentBalance },
    { new: true }
  )

  if (!newBalance) {
    return res.json({
      code: HttpCode.BAD_REQUEST,
      message: 'missing field balance'
    })
  }

  res.json({
    status: status.SUCCESS,
    code: HttpCode.OK,
    data: { currentBalance: req.body.currentBalance }
  })
}

module.exports = balanceSet
