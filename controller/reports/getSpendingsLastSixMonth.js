const { HttpCode } = require('../../helpers/constants')
const lastSixMonth = require('./service/lastSixMonth')

const getSpendingsLastSixMonth = async (req, res) => {
  const owner = req.user._id

  const result = await lastSixMonth(false, owner)

  if (!result) {
    res.status(HttpCode.NO_CONTENT)
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: result,
    message: 'Last six month spendings report has been successufully prepared'
  })
}

module.exports = getSpendingsLastSixMonth
