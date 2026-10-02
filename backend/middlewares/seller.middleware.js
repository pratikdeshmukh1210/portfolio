const jwt = require("jsonwebtoken");
const SellerModel = require("../models/seller.model");

const sellerAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token)
      return res.status(401).json({ message: "Unauthorized seller" });

    const decoded = jwt.verify(token, process.env.JWT_SELLER_SECRET);

    const seller = await SellerModel.findById(decoded.seller_id);

    if (!seller)
      return res.status(404).json({ message: "Seller not found" });

    req.seller = seller;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = sellerAuthMiddleware;
