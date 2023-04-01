const Product = require("../models/product"); // import the product model (class) from the product file in the models directory (../models/product.js)
const Cart = require("../models/cart"); // import the cart model (class) from the cart file in the models directory (../models/cart.js)

exports.getProducts = (req, res, next) => {
  // create a function to get the products page (GET request)
  //console.log('shop.js',adminData.products); // print the products array to the console
  //res.sendFile(path.join(rootDir,'views','shop.html')); // send the shop page (html file)
  //const products = adminData.products; // get the products array from the admin routes
  //res.render('shop',{prods:products,pageTitle:'Shop',path:'/'}); // render the shop page (pug template)
  Product.fetchAll((products) => {
    // fetch all the products from the products array
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

exports.getProduct = (req, res, next) => {
  // create a function to get the product detail page (GET request) (views\shop\product-detail.ejs)
  const prodId = req.params.productId; // get the product id from the url (params)
  //console.log(prodId); // print the product id to the console
  Product.findById(prodId, (product) => {
    // find the product by id
    //console.log(product); // print the product to the console
    res.render("shop/product-detail", {
      // render the product detail page (views\shop\product-detail.ejs)
      product: product, // pass the product to the product detail page (views\shop\product-detail.ejs)
      pageTitle: product.title, // pass the page title to the product detail page (views\shop\product-detail.ejs)
      path: "/products", // pass the path to the product detail page (views\shop\product-detail.ejs)
    }); // render the product detail page (views\shop\product-detail.ejs)
  });
  //res.redirect("/"); // redirect to the home page
};

exports.getIndex = (req, res, next) => {
  // create a function to get the index page (GET request) (views\shop\index.ejs)
  Product.fetchAll((products) => {
    // fetch all the products from the products array (views\shop\index.ejs)
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
  // create a function to get the cart page (GET request) (views\shop\cart.ejs)
  Cart.getCart((cart) => {
    // get the cart from the cart model (class) (models\cart.js)
    Product.fetchAll((products) => {
      // fetch all the products from the products array (views\shop\cart.ejs)
      const cartProducts = []; // create an empty array to store the cart products
      for (product of products) {
        // loop through the products array
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id // find the product in the cart products array (models\cart.js)
        );
        if (cartProductData) {
          // if the product is in the cart products array (models\cart.js)
          cartProducts.push({ productData: product, qty: cartProductData.qty }); // push the product to the cart products array
        }
      }
      res.render("shop/cart", {
        // render the cart page (views\shop\cart.ejs)
        path: "/cart", // pass the path to the cart page
        pageTitle: "Your Cart", // pass the page title to the cart page
        products: cartProducts, // pass the cart products array to the cart page
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  // create a function to post the cart page (POST request)
  const prodId = req.body.productId; // get the product id from the request body
  Product.findById(prodId, (product) => {
    // find the product by id
    Cart.addProduct(prodId, product.price); // add the product to the cart (models\cart.js)
  });
  //console.log(prodId); // print the product id to the console
  res.redirect("/cart"); // redirect to the cart page
};

exports.postCartDeleteProduct = (req, res, next) => {
  // create a function to post the cart delete product page (POST request)
  const prodId = req.body.productId; // get the product id from the request body
  Product.findById(prodId, (product) => {
    // find the product by id
    Cart.deleteProduct(prodId, product.price); // delete the product from the cart (models\cart.js)
    res.redirect("/cart"); // redirect to the cart page
  });
};

exports.getOrders = (req, res, next) => {
  // create a function to get the orders page (GET request) (views\shop\orders.ejs)
  res.render("shop/orders", {
    // render the orders page (views\shop\orders.ejs)
    pageTitle: "Your Orders", // pass the page title to the orders page
    path: "/orders", // pass the path to the orders page
  });
};

exports.getCheckout = (req, res, next) => {
  // create a function to get the checkout page (GET request) (views\shop\checkout.ejs)
  res.render("shop/checkout", {
    // render the checkout page (views\shop\checkout.ejs)
    pageTitle: "Checkout", // pass the page title to the checkout page
    path: "/checkout", // pass the path to the checkout page
  });
};
