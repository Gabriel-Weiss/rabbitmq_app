const express = require("express");
const router = express.Router();
const {
  getAllProductHandler,
  createProductHandler,
  deleteProductHandler,
} = require("../controllers/productsController");

router
  .get("/", getAllProductHandler)
  .post("/", createProductHandler)
  .delete("/:id", deleteProductHandler);

module.exports = router;
