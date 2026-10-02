const express = require("express");
const {
  createProduct,
  getProducts} = require("../controller/product.controller.js");
const sellerAuthMiddleware = require("../middlewares/seller.middleware.js");


const router = express.Router();

router.get("/", getProducts);                 // public
router.post("/create", sellerAuthMiddleware ,createProduct); // protected

module.exports = router;
