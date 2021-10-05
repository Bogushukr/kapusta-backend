const { HttpCode } = require('../../helpers/constants')
const { Transaction } = require('../../model')

const getAll = async (req, res, _) => {
  const transactions = await Transaction.find({})
  console.log(transactions)
  res
    .status(HttpCode.OK)
    .json({ transactions })
}

module.exports = getAll
