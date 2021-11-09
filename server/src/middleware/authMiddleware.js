const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const secrete =
  process.env.jwt_secrete ||
  "jwt_secrete11111111111111111111111111111111feeeeeeeewr3";

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : undefined;

    const decode = await jwt.verify(token, secrete);
    let user = await User.findOne({ _id: decode.id, "tokens.token": token });

    req.user = user;
    req.token = token;
    return next();
  } catch (error) {
    res.status(401).json({
      success: false,
      data: "Please authenticate!",
    });
  }
}

module.exports = authMiddleware;
