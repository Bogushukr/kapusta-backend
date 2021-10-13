const { HttpCode } = require('../../helpers/constants')
const lastSixMonth = require('./service/lastSixMonth')

const getSpendingsLastSixMonth = async (_, res) => {
  const result = await lastSixMonth(false)

  if (!result) {
    res.status(HttpCode.NO_CONTENT)
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result
    },
    message: 'Last six month spendings report has been successufully prepared'
  })
}

module.exports = getSpendingsLastSixMonth
