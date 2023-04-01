const express = require("express"); // import the express module
//const path = require("path"); // import the path module
const bodyParser = require("body-parser"); // import the body-parser module to parse the request body (req.body)

//const rootDir = require("../util/path"); // import the path module to get the root directory path (util/path.js)
const adminController = require("../controllers/admin"); // import the adminController module (controllers/admin.js)

const router = express.Router(); // create a router object to handle the routes (GET and POST requests)

router.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module to parse the request body

//itll be fired when the user visits /admin/add-product (GET request)
router.get("/add-product", adminController.getAddProduct); // get the add-product page

//it'll be fired when /admin/products (GET request)
router.get("/products", adminController.getProducts); // get the products page

//it'll be fired when the form is submitted (POST request)
router.post("/add-product", adminController.postAddProduct); // post the add-product page

//it'll be fired when the user visits /admin/edit-product (GET request)
router.get("/edit-product/:productId", adminController.getEditProduct); // get the edit-product page

//it'll be fired when the form is submitted (POST request)
router.post("/edit-product", adminController.postEditProduct); // post the edit-product page

//it'll be fired when the user visits /admin/delete-product (POST request)
router.post("/delete-product", adminController.postDeleteProduct); // delete the product

/*exports.routes = router; // export the router object
exports.products = products; // export the products array*/
module.exports = router; // export the router object
