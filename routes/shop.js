const express = require("express"); // import the express module
const router = express.Router(); // create a router object from the express module
const path = require("path"); // import the path module

/*const rootDir = require("../util/path"); // import the path module
const adminData = require("./admin"); // import the admin routes*/

const shopController = require("../controllers/shop"); // import the shopController module
// it'll be fired when the user visits /
router.get("/", shopController.getIndex); // get the index page (shop page) (views\shop\index.ejs)

router.get("/products", shopController.getProducts); // get the products page (views\shop\product-list.ejs)

router.get("/cart", shopController.getCart); // get the cart page (views\shop\cart.ejs)

router.get("/orders", shopController.getOrders); // get the orders page (views\shop\orders.ejs)

router.get("/checkout", shopController.getCheckout); // get the checkout page (views\shop\checkout.ejs)

module.exports = router; // export the router object
