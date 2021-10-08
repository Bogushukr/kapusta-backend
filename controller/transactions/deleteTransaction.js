const { HttpCode } = require('../../helpers/constants')
const { Transaction } = require('../../model')

const deleteTransaction = async (req, res, _) => {
  const transaction = await Transaction.findByIdAndDelete({ _id: req.params.transactionId })
  return transaction
    ? res.json({ status: HttpCode.OK, data: { transaction } })
    : res.json({ status: HttpCode.NOT_FOUND })
}

module.exports = deleteTransaction
