const balanceGet = require('./balanceGet')
const balanceSet = require('./balanceSet')
const getIncomingsByCategoriesAndDescriptions = require('./getIncomingsByCategoriesAndDescriptions')
const getIncomingsForMonth = require('./getIncomingsForMonth')
const getIncomingsLastSixMonth = require('./getIncomingsLastSixMonth')
const getSpendingsByCategoriesAndDescriptions = require('./getSpendingsByCategoriesAndDescriptions')
const getSpendingsForMonth = require('./getSpendingsForMonth')
const getSpendingsLastSixMonth = require('./getSpendingsLastSixMonth')

module.exports = {
  balanceGet,
  balanceSet,
  getIncomingsByCategoriesAndDescriptions,
  getIncomingsForMonth,
  getIncomingsLastSixMonth,
  getSpendingsByCategoriesAndDescriptions,
  getSpendingsForMonth,
  getSpendingsLastSixMonth,
}
