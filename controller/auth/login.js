const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../model");
const { HttpCode, status } = require("../../helpers/constants");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: status.FAIL,
      code: HttpCode.BAD_REQUEST,
      message: "Wrong Email",
    });
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: status.FAIL,
      code: HttpCode.BAD_REQUEST,
      message: "Wrong Password",
    });
  }

  const payload = {
    id: user._id,
  };
  const { JWT_KEY } = process.env;
  const token = jwt.sign(payload, JWT_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = login;
