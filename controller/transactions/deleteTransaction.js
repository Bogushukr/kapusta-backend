const { HttpCode } = require('../../helpers/constants')
const { Transaction, User } = require('../../model')

const deleteTransaction = async (req, res, _) => {
  const currentBalance = req.user.currentBalance
  const id = req.user._id
  const currentTransaction = await Transaction.findOne({ _id: req.params.transactionId })

  if (currentTransaction) {
    req.user.cashIncome
        ? await User.findByIdAndUpdate(id, {currentBalance: currentBalance - currentTransaction.value}, {new: true})
        : await User.findByIdAndUpdate(id, {currentBalance: currentBalance + currentTransaction.value}, {new: true})
    const transaction = await Transaction.findByIdAndDelete({ _id: req.params.transactionId })
    res.status(HttpCode.OK).json({ data: { transaction } } )
  }

  res.status(HttpCode.NOT_FOUND).json({ message: `Transaction ${req.params.transactionId} not found!` })
}

module.exports = deleteTransaction