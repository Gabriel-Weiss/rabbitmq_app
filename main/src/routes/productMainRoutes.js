const express = require("express");
const router = express.Router();
const {
  getAllProductHandler,
} = require("../controllers/productMainController");

router.get("/", getAllProductHandler);

module.exports = router;
