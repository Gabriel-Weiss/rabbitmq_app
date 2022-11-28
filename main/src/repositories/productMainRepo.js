const ProductMain = require("../models/ProductMain");

const findAllProducts = async () => {
  return await ProductMain.find().select("-createdAt -updatedAt -__v").lean();
};

const createProduct = async (product) => {
  return await ProductMain.create(product);
};

const deleteProduct = async (name) => {
  return await ProductMain.deleteOne({ name });
};

module.exports = {
  findAllProducts,
  createProduct,
  deleteProduct,
};
