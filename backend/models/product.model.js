const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
     title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: 10,
      maxlength: 1000
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Books",
        "Electronics",
        "Furniture",
        "Notes",
        "Stationery",
        "Others"
      ]
    },

    condition: {
      type: String,
      required: true,
      enum: ["New", "Used"]
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one product image is required"
      }
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // or "User" depending on your model
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }

);

let ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;