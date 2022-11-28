const Product = require("../models/Product");

const findAllProducts = async () => {
  return await Product.find().select("-createdAt -updatedAt -__v").lean();
};

const createProduct = async (product) => {
  return await Product.create(product);
};

const findProductById = async (id) => {
  return await Product.findById(id).exec();
};

const deleteProduct = async (product) => {
  return await product.deleteOne();
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  deleteProduct,
};
