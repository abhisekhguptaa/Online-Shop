const fs = require("fs"); // import the fs module (file system module to read and write files)
const path = require("path"); // import the path module (path module to get the path of the file)

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json"); // get the path of the cart.json file (data\cart.json)

// export the Cart class
module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      // read the cart.json file (data\cart.json)
      let cart = { products: [], totalPrice: 0 }; // create a cart object with products and totalPrice properties (empty array and 0)
      if (!err) {
        // if there is no error
        cart = JSON.parse(fileContent); // parse the fileContent (cart.json file) to JSON and assign it to the cart object
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        // find the index of the product in the cart.products array
        (prod) => prod.id === id // if the product id is equal to the id of the product that we want to add to the cart
      );
      const existingProduct = cart.products[existingProductIndex]; // get the product from the cart.products array using the index of the product that we want to add to the cart
      let updatedProduct; // create a variable to store the updated product
      // Add new product/ increase quantity
      if (existingProduct) {
        // if the product exists in the cart.products array
        updatedProduct = { ...existingProduct }; // copy the existing product to the updatedProduct variable
        updatedProduct.qty = updatedProduct.qty + 1; // increase the quantity of the product by 1
        cart.products = [...cart.products]; // copy the cart.products array to the cart.products array
        cart.products[existingProductIndex] = updatedProduct; // update the product in the cart.products array using the index of the product that we want to add to the cart
      } else {
        // if the product does not exist in the cart.products array
        updatedProduct = { id: id, qty: 1 }; // create a new product with the id of the product that we want to add to the cart and the quantity of 1
        cart.products = [...cart.products, updatedProduct]; // add the new product to the cart.products array
      }
      cart.totalPrice = cart.totalPrice + +productPrice; // update the total price of the cart by adding the price of the product that we want to add to the cart to the total price of the cart
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        // write the updated cart to the cart.json file (data\cart.json)
        console.log(err); // log the error if there is one
      });
    });
  }

  static deleteProduct(id, productPrice) {
    // delete the product from the cart using the id of the product and the price of the product that we want to delete from the cart (the price of the product is needed to update the total price of the cart)
    fs.readFile(p, (err, fileContent) => {
      // read the cart.json file (data\cart.json)
      if (err) {
        // if there is an error  (if the cart.json file does not exist)
        return; // return nothing
      }
      const updatedCart = { ...JSON.parse(fileContent) }; //(parse the fileContent (cart.json file) to JSON and assign it to the updatedCart object)
      const product = updatedCart.products.find((prod) => prod.id === id); // find the product in the cart.products array using the id of the product that we want to delete from the cart
      if (!product) {
        // if the product does not exist in the cart.products array (if the product is not in the cart)
        return; // return nothing
      }
      const productQty = product.qty; // get the quantity of the product that we want to delete from the cart
      updatedCart.products = updatedCart.products.filter(
        // filter the cart.products array to get all the products except the product that we want to delete from the cart
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice = // update the total price of the cart by subtracting the price of the product that we want to delete from the cart multiplied by the quantity of the product that we want to delete from the cart from the total price of the cart
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        // write the updated cart to the cart.json file (data\cart.json)
        console.log(err); // log the error if there is one
      });
    });
  }

  static getCart(cb) {
    // get the cart from the cart.json file (data\cart.json)
    fs.readFile(p, (err, fileContent) => {
      // read the cart.json file (data\cart.json)
      const cart = JSON.parse(fileContent); // parse the fileContent (cart.json file) to JSON and assign it to the cart object
      if (err) {
        // if there is an error (if the cart.json file does not exist)
        cb(null); // call the callback function with null as the argument
      } else {
        // if there is no error (if the cart.json file exists)
        cb(cart); // call the callback function with the cart object as the argument
      }
    });
  }
};
