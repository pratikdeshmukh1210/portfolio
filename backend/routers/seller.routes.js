const express = require("express");
const sellerAuthMiddleware = require('../middlewares/seller.middleware.js')
const {
  registerSellerController,
  sellerLoginController,
  getSellerProfileController,
} = require("../controller/seller.controller.js");


const router = express.Router();

router.post("/register", registerSellerController);
router.post("/login", sellerLoginController);
router.get("/profile/:id",sellerAuthMiddleware , getSellerProfileController);

module.exports = router;
