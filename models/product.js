const fs = require("fs"); // import the fs module to the main file (file system module to read and write files)
const path = require("path"); // import the path module to the main file (path module to work with file and directory paths)
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json"); // get the path to the products.json file

const getProductsFromFile = (cb) => {
  // create a function to get the products from the products.json file
  fs.readFile(p, (err, fileContent) => {
    // read the products.json file
    if (err) {
      // if there's an error (the file doesn't exist)
      cb([]); // return an empty array to the callback function (cb)
    } else {
      // if there's no error (the file exists)
      cb(JSON.parse(fileContent)); // return the products array to the callback function (cb)
    }
  });
};

module.exports = class Product {
  // export the Product class
  constructor(title, imageUrl, price, description) {
    // create a constructor to initialize the product
    this.title = title; // set the title property of the product to the title argument
    this.imageUrl = imageUrl; // set the imageUrl property of the product to the imageUrl argument
    this.price = price; // set the price property of the product to the price argument
    this.description = description; // set the description property of the product to the description argument
  }

  save() {
    // create a save method to save the product to the products.json file (add the product to the products array)
    //const p = path.join(rootDir, "data", "products.json"); // get the path to the products.json file (data\products.json)
    getProductsFromFile((products) => {
      // get the products array from the products.json file (data\products.json)
      products.push(this); // push the product to the products array (add the product to the products array)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        // write the products array to the products.json file (data\products.json)
        console.log(err); // print the error to the console (if there's an error)
      });
    });
  }

  static fetchAll(cb) {
    // create a static fetchAll method to get the products array from the products.json file (data\products.json)
    //const p = path.join(rootDir, "data", "products.json");  // get the path to the products.json file (data\products.json)
    getProductsFromFile(cb); // get the products array from the products.json file (data\products.json) and return it to the callback function (cb)
  }
};
