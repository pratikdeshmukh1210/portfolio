const ProductModel = require("../models/product.model.js");

// CREATE PRODUCT (LOGIN REQUIRED)
const createProduct = async (req, res) => {
  try {

    if (!req.seller) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const product = await ProductModel.create({
      ...req.body,
      seller: req.seller._id
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// GET PRODUCTS (HOMEPAGE – PUBLIC)
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ isActive: true })
      .sort({ createdAt: -1 })   // latest first
      .limit(20)                 // only 20 products
      .populate("seller", "name");

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};

module.exports = {
  createProduct,
  getProducts
};
