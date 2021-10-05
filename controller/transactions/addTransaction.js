const { HttpCode } = require('../../helpers/constants')
const { Transaction } = require('../../model')

const add = async (req, res, _) => {
  const newTransaction = { ...req.body }
  const transaction = await Transaction.create(newTransaction)
  res.status(HttpCode.CREATED).json({ transaction })
}

module.exports = add
