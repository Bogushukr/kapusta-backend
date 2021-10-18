const { HttpCode } = require('../../helpers/constants')
const { Transaction } = require('../../model')

const getAll = async (req, res, _) => {
  const transactions = await Transaction.find({owner: req.user._id })
  res
    .status(HttpCode.OK)
    .json({ transactions })
}

module.exports = getAll
