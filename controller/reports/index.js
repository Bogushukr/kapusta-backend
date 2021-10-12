const balanceGet = require('./balanceGet')
const getIncomingsByCategoriesAndDescriptions = require('./getIncomingsByCategoriesAndDescriptions')
const getIncomingsForMonth = require('./getIncomingsForMonth')
const getIncomingsLastSixMonth = require('./getIncomingsLastSixMonth')
const getSpendingsForMonth = require('./getSpendingsForMonth')
const getSpendingsLastSixMonth = require('./getSpendingsLastSixMonth')

module.exports = {
  balanceGet,
  getIncomingsByCategoriesAndDescriptions,
  getIncomingsForMonth,
  getIncomingsLastSixMonth,
  getSpendingsForMonth,
  getSpendingsLastSixMonth
}
