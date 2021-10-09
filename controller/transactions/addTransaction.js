const { HttpCode } = require('../../helpers/constants')
const { Transaction, User } = require('../../model')

const add = async (req, res, _) => {
  const id = req.user._id
  const newTransaction = { ...req.body, owner: id }
  const transaction = await Transaction.create(newTransaction)
  res.status(HttpCode.CREATED).json({ transaction })
}

module.exports = add
