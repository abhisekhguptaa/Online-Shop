const Product = require("../models/product"); // import the product model (class) (../models/product.js)
// const mongodb = require("mongodb"); // import the mongodb module

// const ObjectId = mongodb.ObjectId; // create an ObjectId object from the mongodb module

exports.getAddProduct = (req, res, next) => {
  // create a function to get the add-product page (GET request)
  res.render("admin/edit-product", {
    // render the edit-product page
    pageTitle: "Add product", // pass the page title to the edit-product page
    path: "/admin/add-product", // pass the path to the edit-product page
    editing: false, // pass the editing variable to the edit-product page
    isAuthenticated: req.session.isLoggedIn,
    /*formsCSS: true, // pass the formsCSS variable to the add-product page  
    productCSS: true, // pass the productCSS variable to the add-product page  
    activeAddProduct: true, // pass the activeAddProduct variable to the add-product page*/
  });
};

exports.postAddProduct = (req, res, next) => {
  // create a function to add a product (POST request) (../routes/admin.js)
  //products.push({ title: req.body.title }); // push the product to the products array
  const title = req.body.title; // get the title from the request body
  const imageUrl = req.body.imageUrl; // get the image url from the request body
  const price = req.body.price; // get the price from the request body
  const description = req.body.description; // get the description from the request body
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  }); // create a new product object from the product model (class) and pass the title, image url, price and description to the constructor
  // req.user
  //   .createProduct({
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //   })
  product
    .save()
    .then((results) => {
      //console.log(results);
      console.log("Product created successfully");
      res.redirect("/admin/products"); // redirect to the admin products page
    })
    .catch((err) => {
      console.log(err);
    });
  /*const product = new Product(null, title, imageUrl, price, description); // create a new product object from the product model (class) and pass the title, image url, price and description to the constructor
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    }); // save the product to the products array (../models/product.js)
 */
};

exports.getEditProduct = (req, res, next) => {
  // create a function to get the edit-product page (GET request)
  const editMode = req.query.edit; // get the edit mode from the query string (../views/admin/edit-product.ejs)
  if (!editMode) {
    // if the edit mode is false (not in edit mode) then redirect to the home page (shop page)
    return res.redirect("/");
  }
  const prodId = req.params.productId; // get the product id from the request parameters (../routes/admin.js)
  // req.user
  //   .getProducts({ where: { id: prodId } })  
  //Product.findByPk(prodId)
  Product.findById(prodId)
    .then((product) => {
      // const product = products[0];
      if (!product) {
        // if the product is  not found then redirect to the home page (shop page)
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        // render the add-product page
        pageTitle: "Edit product", // pass the page title to the edit-product page
        path: "/admin/edit-product", // pass the path to the edit-product page
        editing: editMode, // pass the editing variable to the edit-product page
        product: product, // pass the product to the edit-product page
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      // find the product by id (../models/product.js)
    });
};

exports.postEditProduct = (req, res, next) => {
  // create a function to edit a product (POST request)
  const prodId = req.body.productId; // get the product id from the request body
  const updatedTitle = req.body.title; // get the updated title from the request body
  const updatedPrice = req.body.price; // get the updated price from the request body
  const updatedImageUrl = req.body.imageUrl; // get the updated image url from the request body
  const updatedDesc = req.body.description; // get the updated description from the request body
  /*const updatedProduct = new Product(
    prodId, // pass the product id to the constructor
    updatedTitle, // pass the updated title to the constructor
    updatedImageUrl, // pass the updated image url to the constructor
    updatedPrice, // pass the updated price to the constructor
    updatedDesc // pass the updated description to the constructor
  );
  updatedProduct.save(); // save the updated product to the products array
  */

  // product.title = updatedTitle;
  // product.price = updatedPrice;
  // product.imageUrl = updatedImageUrl;
  // product.description = updatedDesc;
  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId
  // );

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("Product updated successfully");
      res.redirect("/admin/products"); // redirect to the admin products page
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  // create a function to get the admin products page (GET request)
  //Product.findAll()
  Product.find()
  // .select('title price -_id')
  // .populate('userId', 'name')
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        // render the admin products page (../views/admin/products.ejs)
        prods: products, // pass the products to the admin products page
        pageTitle: "Admin Products", // pass the page title to the admin products page
        path: "/admin/products", // pass the path to the admin products page
        isAuthenticated: req.session.isLoggedIn, // pass the isAuthenticated variable to the admin products page
        /*hasProducts: products.length > 0, // pass the hasProducts variable to the shop page
          activeShop: true, // pass the activeShop variable to the shop page
          productCSS: true, // pass the productCSS variable to the shop page*/
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // fetch all the products from the products array
};

exports.postDeleteProduct = (req, res, next) => {
  // create a function to delete a product (POST request)
  const prodId = req.body.productId; // get the product id from the request body
  Product.findByIdAndRemove(prodId)
    .then((result) => {
      console.log("Product destroyed successfully");
      res.redirect("/admin/products"); // redirect to the admin products page
    })
    .catch((err) => {
      console.log(err);
    }); // delete the product by id (../models/product.js)
};


