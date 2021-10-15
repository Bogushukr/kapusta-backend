const { HttpCode } = require('../../helpers/constants')
const { Transaction, User } = require('../../model')

const lengthChecker = (month) => {
  const str = month.split('')
  if (str.length === 1) {
    return `0${month}`
  }
  return month
}

const add = async (req, res, _) => {
  const id = req.user._id
  const currentBalance = req.user.currentBalance
  const newTransaction = { ...req.body, owner: id, month: lengthChecker(req.body.month), day: lengthChecker(req.body.day) }



  const transaction = await Transaction.create(newTransaction)

  if (currentBalance < req.body.value) {
    return res.status(HttpCode.BAD_REQUEST).json({ message: 'No money, no funny' })
  }
  req.body.cashIncome
      ? await User.findByIdAndUpdate(id, {currentBalance: currentBalance + req.body.value}, {new: true})
      : await User.findByIdAndUpdate(id, {currentBalance: currentBalance - req.body.value}, {new: true})

  res.status(HttpCode.CREATED).json({ transaction })
}

module.exports = add
