const jwt = require("jsonwebtoken");
const { errorHandler } = require("../errors/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));
  //TODO: finish user verification
};

module.exports = { verifyToken };
