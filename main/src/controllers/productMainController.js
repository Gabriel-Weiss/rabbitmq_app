const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { findAllProducts } = require("../repositories/productMainRepo");

//  @description Get all products
//  @route GET /products
//  @access Public
const getAllProductHandler = asyncHandler(async (req, res) => {
  const products = await findAllProducts();
  if (!products?.length) {
    return res.status(400).json({ message: "No products found." });
  }
  return res.json(products);
});

module.exports = { getAllProductHandler };
