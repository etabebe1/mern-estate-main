const { errorHandler } = require("../errors/error");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

//*:::::: controller to update a user ::::::*//

const updateUser = async (req, res, next) => {
  let {
    body: {
      user: { username, email, password, avatar },
    },
    params: { id },
    user: { id: _id },
  } = req;

  id !== _id && next(errorHandler(401, "You can only update your own account"));

  try {
    const salt = await bcrypt.genSalt(10);
    if (password) {
      password = await bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true }
    );
    const { password: userPassword, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser };
