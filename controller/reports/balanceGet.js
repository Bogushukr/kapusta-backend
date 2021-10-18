const { HttpCode } = require('../../helpers/constants')
const getCashState = require('./service/getCashState')

const balanceGet = async (req, res) => {
  const owner = req.user._id
  const currentBalance = req.user.currentBalance

  const cashInBalance = (await getCashState(true, owner)) || 0
  const cashOutBalance = (await getCashState(false, owner)) || 0


  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      cashOutBalance: cashOutBalance,
      cashInBalance: cashInBalance,
      balance: currentBalance
    },
    message: `Total Balance: ${currentBalance}`
  })
}

module.exports = balanceGet
