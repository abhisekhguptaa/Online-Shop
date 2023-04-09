const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id,userId) {
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userId=userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log('Product Deleted');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

/*const db = require("../util/database"); // import the database module (it'll be used to connect to the database)
//const fs = require("fs"); // import the fs module(file system module to read and write files)
//const path = require("path"); // import the path module (path module to work with file and directory paths)

//const rootDir = require("../util/path"); // import the path module (path module to work with file and directory paths)
const Cart = require("./cart"); // import the cart module

//const p = path.join(rootDir, "data", "products.json"); // get the path to the products.json file


const getProductsFromFile = (cb) => {
  // create a function to get the products from the products.json file
  fs.readFile(p, (err, fileContent) => {
    // read the products.json file
    if (err) {
      // if there's an error (the file doesn't exist)
      cb([]); // return an empty array to the callback function (cb) (the products array)
    } else {
      // if there's no error (the file exists)
      cb(JSON.parse(fileContent)); //return the products array to the callback function (cb) (the products array)
    }
  });
};


module.exports = class Product {
  // export the Product class
  constructor(id, title, imageUrl, price, description) {
    // create a constructor to initialize the product
    this.id = id; // set the id property of the product to the id argument
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
      if (this.id) {
        // if the product has an id (the product already exists in the products array)
        const existingProductIndex = products.findIndex(
          // find the index of the product in the products array by id
          (prod) => prod.id === this.id // find the product in the products array by id
        );
        const updatedProducts = [...products]; // create a copy of the products array (copy the products array)
        updatedProducts[existingProductIndex] = this; // update the product in the products array by id
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          // write the products array to the products.json file (data\products.json)
          console.log(err); // print the error to the console (if there's an error)
        });
      } else {
        // if the product doesn't have an id (the product doesn't exist in the products array)
        this.id = Math.random().toString(); // set the id property of the product to a random number
        // get the products array from the products.json file (data\products.json)
        products.push(this); // push the product to the products array (add the product to the products array)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          // write the products array to the products.json file (data\products.json)
          console.log(err); // print the error to the console (if there's an error)
        });
      }
    });
    
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    ); // insert the product to the database
  }

  static deleteById(id) {
    // create a static deleteById method to delete a product from the products.json file (delete the product from the products array) by id
    
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      // get the products array from the products.json file (data\products.json)
      const updatedProducts = products.filter((prod) => prod.id !== id); // find the product in the products array by id
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        // write the products array to the products.json file (data\products.json)
        if (!err) {
          // if there's no error (the file exists)
          Cart.deleteProduct(id, product.price); // delete the product from the cart by id and price
        }
      });
    });
    
  }

  static fetchAll() {
    // create a static fetchAll method to get the products array from the products.json file (data\products.json)
    //const p = path.join(rootDir, "data", "products.json");  // get the path to the products.json file (data\products.json)
    //getProductsFromFile(cb); // get the products array from the products.json file (data\products.json) and return it to the callback function (cb)
    return db.execute("SELECT * FROM products"); // return all the products from the database
  }

  static findById(id) {
    // create a static findById method to get a product from the products array by id
    
    getProductsFromFile((products) => {
      // get the products array from the products.json file (data\products.json)
      const product = products.find((p) => p.id === id); // find the product in the products array by id
      cb(product); // return the product to the callback function (cb)
    });
    
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]); // return the product from the database by id
  }
};
*/
