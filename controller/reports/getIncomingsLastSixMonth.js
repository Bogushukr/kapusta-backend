const { HttpCode } = require('../../helpers/constants')
const lastSixMonth = require('./service/lastSixMonth')

const getIncomingsLastSixMonth = async (req, res) => {
  const owner = req.user._id

  const result = await lastSixMonth(true, owner)

  if (!result) {
    res.status(HttpCode.NO_CONTENT)
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: result,
    message: 'Last six month incoming report has been successfully prepared'
  })
}

module.exports = getIncomingsLastSixMonth
