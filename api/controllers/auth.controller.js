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

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        bearer: { accessToken: "accessToken", token, httpOnly: true },
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

//*:::::: user sign-up || sign-in route ::::::*//
const google = async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      // POINT: user founded therefore user sign-in operation performed
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = user._doc;

      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          bearer: { accessToken: "accessToken", token, httpOnly: true },
          user: rest,
        });
    } else {
      // POINT: user not founded therefore, user sign-up operation performed

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const generatedName =
        displayName.split(" ").join("").toLowerCase() +
        "_" +
        Math.round(Math.random() * 1000);

      const user = await User({
        username: generatedName,
        email,
        password: generatedPassword,
        avatar: photoURL,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: userPassword, ...rest } = user._doc;

      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          bearer: { accessToken: "accessToken", token, httpOnly: true },
          user: rest,
        });
    }
  } catch (error) {
    // DONE: handle error with custom error handler
    next(error);
  }
};

//*:::::: user sign-out route ::::::*//
const signOut = async (req, res, next) => {
  try {
    // NOTE: res.clearCookie is for testing case with out using client side request
    // NOTE: it means the cookie will be stored into cookie of thunder client.
    res.clearCookie("accessToken");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

module.exports = { sign_up, sign_in, google, signOut };

//
//
//
//
//
//
//
//
//
//
//

// const user = await User.findOne({ email });
// if (user) {
//   //POINT: user founded therefore user sign-in operation performed
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   const { password: userPassword, ...rest } = user._doc;

//   res
//     .cookie("accessToken", token, { httpOnly: true })
//     .status(200)
//     .json({
//       success: true,
//       bearer: { accessToken: "accessToken", token, httpOnly: true },
//       user: rest,
//     });
// } else {
//POINT: user not founded therefore, user sign-up operation performed

// const generatedPassword =
//   Math.random().toString(36).slice(-8) +
//   Math.random().toString(36).slice(-8);

// const user = new User({
//   username:
//     name.split(" ").join("").toLowerCase() +
//     Math.random().toString(36).slice(-4),
//   email: email,
//   generatedPassword,
//   avatar: photo,
// });

// await user.save();
// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// const { password: userPassword, ...rest } = user;

// res
//   .cookie("accessToken", token, { httpOnly: true })
//   .status(200)
//   .json({
//     success: true,
//     bearer: { accessToken: "accessToken", token, httpOnly: true },
//     user: rest,
//   });

// LOGS:
// console.log(email, generatedPassword, photo);
// }
