const { User } = require("../../model");
const { HttpCode, status } = require("../../helpers/constants");

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.json({
    status: status.SUCCESS,
    code: HttpCode.OK,
    message: "Success logout",
  });
};

module.exports = logout;
