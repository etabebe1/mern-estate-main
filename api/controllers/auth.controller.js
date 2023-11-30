const jwt = require("jsonwebtoken");
const { errorHandler } = require("../errors/error");
const User = require("../model/user.model");

//*:::::: user sign-up route ::::::*//
const sign_up = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = await User({ username, email, password });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

//*:::::: user sign-in route ::::::*//
const sign_in = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const passwordMatch = await validUser.comparePassword(password);
    if (!passwordMatch) return next(errorHandler(401, "Wrong credentials"));

    const { password: userPassword, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      token: { access_token: "access_token", token, httpOnly: true },
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sign_up, sign_in };
