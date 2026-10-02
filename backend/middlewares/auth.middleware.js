const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decode = jwt.verify(token, process.env.jwt_secret_key);

    const user = await UserModel.findById(decode.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token! Unauthorized",
      error: error.message,
    });
  }
};

module.exports = { authMiddleware };

