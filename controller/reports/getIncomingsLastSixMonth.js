const { HttpCode } = require('../../helpers/constants')
const lastSixMonth = require('./service/lastSixMonth')

const getIncomingsLastSixMonth = async (_, res) => {
  const result = await lastSixMonth(true)

  if (!result) {
    res.status(HttpCode.NO_CONTENT)
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result
    },
    message: 'Last six month incomings report has been successufully prepared'
  })
}

module.exports = getIncomingsLastSixMonth
