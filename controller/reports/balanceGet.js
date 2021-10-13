const { HttpCode } = require('../../helpers/constants')
const getCashState = require('./service/getCashState')

const balanceGet = async (req, res) => {
  const owner = req.user._id

  const cashOutBalance = await getCashState(false, owner)
  const cashInBalance = await getCashState(true, owner)
  const balance = cashInBalance - cashOutBalance

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      cashOutBalance: cashOutBalance,
      cashInBalance: cashInBalance,
      balance: balance
    },
    message: `Total Balance: ${cashInBalance} - ${cashOutBalance} = ${balance}`
  })
}

module.exports = balanceGet
