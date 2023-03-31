const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    // render the add-product page
    pageTitle: "Add product", // pass the page title to the add-product page
    path: "/admin/add-product", // pass the path to the add-product page
    /*formsCSS: true, // pass the formsCSS variable to the add-product page  
    productCSS: true, // pass the productCSS variable to the add-product page  
    activeAddProduct: true, // pass the activeAddProduct variable to the add-product page*/
  });
};

exports.postAddProduct = (req, res, next) => {
  //products.push({ title: req.body.title }); // push the product to the products array
  const title = req.body.title; // get the title from the request body
  const imageUrl = req.body.imageUrl; // get the image url from the request body
  const price = req.body.price; // get the price from the request body
  const description = req.body.description; // get the description from the request body
  const product = new Product(title, imageUrl, price, description); // create a new product object from the product model (class) and pass the title, image url, price and description to the constructor
  product.save(); // save the product to the products array (../models/product.js)
  res.redirect("/"); // redirect to the home page (shop page)
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      /*hasProducts: products.length > 0, // pass the hasProducts variable to the shop page
          activeShop: true, // pass the activeShop variable to the shop page
          productCSS: true, // pass the productCSS variable to the shop page*/
    });
  });
};
