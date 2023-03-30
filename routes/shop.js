const express = require("express"); // import the express module
const router = express.Router(); // create a router object from the express module
const path = require("path"); // import the path module

const rootDir = require("../util/path"); // import the path module

const adminData = require("./admin"); // import the admin routes

// it'll be fired when the user visits /
router.get("/", (req, res, next) => {
  //console.log('shop.js',adminData.products); // print the products array to the console
  //res.sendFile(path.join(rootDir,'views','shop.html')); // send the shop page (html file)
  const products = adminData.products; // get the products array from the admin routes
  //res.render('shop',{prods:products,pageTitle:'Shop',path:'/'}); // render the shop page (pug template)
  res.render("shop", {
    // render the shop page (handlebars template)
    prods: products, // pass the products array to the shop page
    pageTitle: "Shop", // pass the page title to the shop page
    path: "/", // pass the path to the shop page
    hasProducts: products.length > 0, // pass the hasProducts variable to the shop page
    activeShop: true, // pass the activeShop variable to the shop page
    productCSS: true, // pass the productCSS variable to the shop page
  });
});

module.exports = router; // export the router object
