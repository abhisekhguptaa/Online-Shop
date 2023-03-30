const express = require("express"); // import the express module
const router = express.Router(); // create a router object from the express module
const bodyParser = require("body-parser"); // import the body-parser module
const path = require("path"); // import the path module 

const rootDir = require("../util/path"); // import the path module to the main file 

const products = []; // create an empty array to store the products in it (it'll be exported to the admin routes) 

router.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module to parse the request body

//itll be fired when the user visits /admin/add-product (GET request) 
router.get("/add-product", (req, res, next) => { 
  res.render("add-product", { // render the add-product page (handlebars template)
    pageTitle: "Add product", // pass the page title to the add-product page
    path: "/admin/add-product", // pass the path to the add-product page 
    formsCSS: true, // pass the formsCSS variable to the add-product page
    productCSS: true, // pass the productCSS variable to the add-product page
    activeAddProduct: true, // pass the activeAddProduct variable to the add-product page
  }); // render the add-product page (handlebars template)
});

//it'll be fired when the form is submitted (POST request)
router.post("/add-product", (req, res, next) => { 
  products.push({ title: req.body.title }); // push the product to the products array 
  res.redirect("/"); // redirect to the home page 
});

exports.routes = router; // export the router object 
exports.products = products; // export the products array 
