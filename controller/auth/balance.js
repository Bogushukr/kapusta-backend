const { User } = require('../../model');
const { HttpCode, status } = require('../../helpers/constants')


const balance = async (req, res) => {
    const { token } = req.user
    const { currentBalance } = await User.findOne({ token })

    res.json({
        status: status.SUCCESS,
        code: HttpCode.OK,
        data: {
            currentBalance
        }
    })
}

module.exports = balance