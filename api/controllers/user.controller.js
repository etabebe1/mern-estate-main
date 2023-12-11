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
    user: { id: userId },
  } = req;

  id !== userId &&
    next(errorHandler(401, "You can only update your own account"));

  // console.log(username, email, password,user);

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

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

//*:::::: controller to delete a user ::::::*//

const deleteUser = async (req, res, next) => {
  const {
    params: { id },
    user: { id: _id },
  } = req;

  if (id !== _id)
    return next(errorHandler(401, "You can only delete your account!"));

  // NOTE: res.clearCookie is for testing case with out using client side request
  //NOTE: it means the cookie will be stored into cookie of thunder client.
  try {
    await User.findOneAndDelete({ _id: id });
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, deleteUser };
