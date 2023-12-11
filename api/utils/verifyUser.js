const jwt = require("jsonwebtoken");
const { errorHandler } = require("../errors/error");

const verifyToken = (req, res, next) => {
  // NOTE: the access_token with req.cookies.access_token is for test purpose only without using client side interface.
  // NOTE: To test Thunder-CLient, Postman or other sever-side test can be used.
  // const access_token = req.cookies.access_token;

  // const { access_token } = req.body;
  const { access_token } = req.body;
  !access_token && next(errorHandler(401, "Unauthorized"));

  // LOGS:

  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    err && next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
