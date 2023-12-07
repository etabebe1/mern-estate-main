const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Pease Provide your username"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Pease Provide your email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please provide your password!"],
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//*:::::: used by the register route to encrypt password automatically ::::::*//
userSchema.pre("save", async function (next) {
  //Check if the password has been modified
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
  } catch (error) {
    next(error);
  }

});

//*:::::: used by the login route to compare password after password is provided ::::::*//
userSchema.methods.comparePassword = async function (candidatePassword) {
  const matchTrue = await bcrypt.compare(candidatePassword, this.password);
  return matchTrue;
};

module.exports = mongoose.model("user", userSchema);
