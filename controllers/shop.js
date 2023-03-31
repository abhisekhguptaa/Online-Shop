//const products = []; // create an empty array to store the products in it (it'll be exported to the admin routes)

const Product = require("../models/product"); // import the product model (class) from the product file in the models directory (../models/product.js)

exports.getProducts = (req, res, next) => {
  //console.log('shop.js',adminData.products); // print the products array to the console
  //res.sendFile(path.join(rootDir,'views','shop.html')); // send the shop page (html file)
  //const products = adminData.products; // get the products array from the admin routes
  //res.render('shop',{prods:products,pageTitle:'Shop',path:'/'}); // render the shop page (pug template)
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      // render the shop page (ejs template) (views\shop\product-list.ejs)
      prods: products, // pass the products array to the shop page (views\shop\product-list.ejs)
      pageTitle: "All Products", // pass the page title to the shop page (views\shop\product-list.ejs)
      path: "/products", // pass the path to the shop page (views\shop\product-list.ejs)
      /*hasProducts: products.length > 0, // pass the hasProducts variable to the shop page
      activeShop: true, // pass the activeShop variable to the shop page
      productCSS: true, // pass the productCSS variable to the shop page*/
    });
  });
};

exports.getIndex = (req, res, next) => {
  // get the index page (shop page) (views\shop\index.ejs)
  Product.fetchAll((products) => {
    res.render("shop/index", {
      // render the shop page (views\shop\index.ejs)
      prods: products, // pass the products array to the shop page (views\shop\index.ejs)
      pageTitle: "Shop", // pass the page title to the shop page (views\shop\index.ejs)
      path: "/", // pass the path to the shop page (views\shop\index.ejs)
      /*hasProducts: products.length > 0, // pass the hasProducts variable to the shop page
      activeShop: true, // pass the activeShop variable to the shop page
      productCSS: true, // pass the productCSS variable to the shop page*/
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart", // pass the page title to the cart page
    path: "/cart", // pass the path to the cart page
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders", // pass the page title to the cart page
    path: "/orders", // pass the path to the cart page
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout", // pass the page title to the checkout page
    path: "/checkout", // pass the path to the checkout page
  });
};
