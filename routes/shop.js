const express = require("express"); // import the express module
/*const rootDir = require("../util/path"); // import the path module
const adminData = require("./admin"); // import the admin routes*/

const shopController = require("../controllers/shop"); // import the shopController module (controllers\shop.js)
const isAuth = require("../middleware/is-auth");

const router = express.Router(); // create a router object from the express module

// it'll be fired when the user visits /
router.get("/", shopController.getIndex); // get the index page (shop page) (views\shop\index.ejs)

// it'll be fired when the user visits /products (GET request)
router.get("/products", shopController.getProducts); // get the products page (views\shop\product-list.ejs)

// it'll be fired when the user visits /products/productId (GET request)
router.get("/products/:productId", shopController.getProduct); // get the product page (views\shop\product-detail.ejs)

// it'll be fired when the user visits /cart (GET request)
router.get("/cart", isAuth, shopController.getCart); // get the cart page (views\shop\cart.ejs)

// it'll be fired when the user visits /cart (POST request)
router.post("/cart", isAuth, shopController.postCart); // post the cart page (views\shop\cart.ejs)

// it'll be fired when the user visits /cart-delete-item (POST request)
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct); // post the cart page (views\shop\cart.ejs)

// it'll be fired when the user visits /create-order (POST request)
router.post("/create-order", isAuth, shopController.postOrder); // get the orders page (views\shop\orders.ejs)

// it'll be fired when the user visits /create-order (POST request)
router.get("/orders", isAuth, shopController.getOrders); // get the orders page (views\shop\orders.ejs)

module.exports = router; // export the router object
