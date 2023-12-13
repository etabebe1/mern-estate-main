const express = require("express");
const app = express();

// const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//*:::::: importing routers from router ::::::*//
const userRouter = require("./routers/user.routes");
const authRouter = require("./routers/auth.routes");
const listRouter = require("./routers/listing.routes");

//*:::::: making donEnv ready to use ::::::*//
dotenv.config();

//*::::: setup to connection with database ::::::*//
const connectDB = require("./database/connectDB");

//*::::: middleware ::::::*//
//* FIXME: fix proxy setup middleware
// const apiProxy = createProxyMiddleware("/api", {
//   target: "http://localhost:8800",
//   changeOrigin: true,
// });
// app.use("/api", apiProxy);

app.use(cors());
app.use(express.json()); //NOTE: allow a json() obj to be an input to the server
app.use(helmet());
app.use(morgan("common")); // used to indicate request and related info
app.use(cookieParser());

//*::::: server routes :::::*//
app.use("/api/user/", userRouter);
app.use("/api/authentication/", authRouter);
app.use("/api/listing/", listRouter);

//*::::: error handler middleware :::::*//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//*::::: port and URI connection :::::*//
const port = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

//*:::::: Initializing server ::::::*//
const start = async () => {
  try {
    await connectDB(URI);
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  } catch (error) {
    console.log(error);
  }
};
start();
