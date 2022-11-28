const asyncHandler = require("express-async-handler");
const connectAndSend = require("../config/amqpOptions");
const mongoose = require("mongoose");
const {
  findAllProducts,
  createProduct,
  findProductById,
  deleteProduct,
} = require("../repositories/productRepo");

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

//  @description Create a new Product
//  @route POST /products
//  @access Private
const createProductHandler = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    res.status(400).json({ message: "All fields must be provided." });
  }

  const productObject = { name, price, description };
  const created = await createProduct(productObject);

  created
    ? (res
        .status(201)
        .json({ message: `${productObject.name} created successfully` }),
      connectAndSend("product_created", Buffer.from(JSON.stringify(created))))
    : res.status(400).json({
        message: `${productObject.name} could not be created`,
      });
});

//  @description Delete a Product
//  @route DELETE /products/:id
//  @access Private
const deleteProductHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const product = await findProductById(id);

  if (!product) res.status(400).json({ message: "Product not found" });

  const deletedProduct = await deleteProduct(product);
  res.json({ message: `${deletedProduct.name} deleted successfully` });
  connectAndSend("product_removed", Buffer.from(JSON.stringify(product.name)));
});

module.exports = {
  getAllProductHandler,
  createProductHandler,
  deleteProductHandler,
};
