const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.post(
  "/add-product",
  [
    body("title", "Title must be at least 3 characters long")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Price must be a valid number").isFloat(),
    body("description", "Description must be at least 5 characters long")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Title must be at least 3 characters long")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Price must be a valid number").isFloat(),
    body("description", "Description must be at least 5 characters long")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
