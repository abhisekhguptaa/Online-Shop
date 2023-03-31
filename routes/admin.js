const express = require("express"); // import the express module
const router = express.Router(); // create a router object to handle the routes (GET and POST requests)
const bodyParser = require("body-parser"); // import the body-parser module to parse the request body
const path = require("path"); // import the path module to the main file

//const rootDir = require("../util/path"); // import the path module to the main file
const adminController = require("../controllers/admin"); // import the adminController module to the main file

router.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module to parse the request body

//itll be fired when the user visits /admin/add-product (GET request)
router.get("/add-product", adminController.getAddProduct); // get the add-product page
// fired when /admin/products (GET request)
router.get("/products", adminController.getProducts); // get the products page

//it'll be fired when the form is submitted (POST request)
router.post("/add-product", adminController.postAddProduct); // post the add-product page

/*exports.routes = router; // export the router object
exports.products = products; // export the products array*/
module.exports = router; // export the router object
