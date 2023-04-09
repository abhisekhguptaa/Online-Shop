const express = require("express"); // import the express module
const path = require("path"); // import the path module
const bodyParser = require("body-parser"); // import the body-parser module
const mongoose = require("mongoose"); // import the mongoose module
const session = require("express-session"); // import the express-session module
const MongoDBStore = require("connect-mongodb-session")(session); // import the connect-mongodb-session module (it'll be used to store the session in the database)
//const expressHbs = require("express-handlebars"); // import the express-handlebars module
//const { log } = require("console");  // import the console module (it'll be used to log messages to the console)

const adminRoutes = require("./routes/admin"); // import the admin routes (it'll be used for all the requests that start with /admin)
const shopRoutes = require("./routes/shop"); // import the shop routes (it'll be used for all the requests)
const authRoutes = require("./routes/auth"); // import the auth routes (it'll be used for all the requests that start with /auth)

const errorController = require("./controllers/error"); // import the error controller (it'll be used for all the requests)

const User = require("./models/user"); // import the user model (it'll be used to create a user)
// const Cart = require("./models/cart"); // import the cart model (it'll be used to create a cart)
// const CartItem = require("./models/cart-item"); // import the cart item model (it'll be used to create a cart item)
// const Order = require("./models/order"); // import the order model (it'll be used to create an order)
// const OrderItem = require("./models/order-item"); // import the order item model (it'll be used to create an order item)
// const Product = require("./models/product"); // import the product model (it'll be used to create a product)

// const mongoConnect = require("./util/database").mongoConnect; // import the database module (it'll be used to connect to the database)
// const sequelize = require("./util/database"); // import the database module (it'll be used to connect to the database)
// const db = require("./util/database"); // import the database module (it'll be used to connect to the database and execute queries to the database)

const MONGODB_URI =
  "mongodb+srv://Abhisekh:fzFptUcrpH6oWMaB@first.cjwqqgj.mongodb.net/?retryWrites=true&w=majority";

const app = express(); // create an express app object from the express module (it'll be used to handle the requests)
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
}); // create a new MongoDBStore object (it'll be used to store the session in the database)

// app.engine(
//   // set the view engine to handlebars and set the extension to
//   "hbs", // set the extension to hbs
//   expressHbs({
//     // set the handlebars options
//     layoutsDir: "views/layouts/", // set the layouts directory to views/layouts
//     defaultLayout: "main-layout", // set the default layout to main-layout
//     extname: "hbs", // set the extension to hbs
//   })
// );

//app.set("view engine", "hbs"); // set the view engine to handlebars
//app.set('view engine', 'pug'); // set the view engine to pug

app.set("view engine", "ejs"); // set the view engine to ejs
app.set("views", "views"); // set the views directory to views (it's the default directory)

app.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module to parse the request body (it'll be used for all the requests)
app.use(express.static(path.join(__dirname, "public"))); // use the public directory to serve static files (css, js, images, etc.)

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  //   // use the middleware to set the user to the request (it'll be used for all the requests)
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id) // find the user with id 6430150a2bb1d915d549ee0a (it's the id of the user that we created in the database)
    .then((user) => {
      req.user = user; // set the user to the request
      next(); // call the next middleware
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
});

app.use("/admin", adminRoutes); // use the admin routes with /admin prefix (it'll be used for all the requests that start with /admin)
app.use(shopRoutes); // use the shop routes (it'll be used for all the requests)
app.use(authRoutes); // use the auth routes with /auth prefix (it'll be used for all the requests that start with /auth)

// db.execute("SELECT * FROM products") // execute the query to select all the products from the products table
//   .then((result) => { // if the query is executed successfully
//     console.log(result[0], result[1]); // log the result to the console (it'll be an array of arrays) (the first array will contain the rows and the second array will contain the metadata) (the metadata will contain the column names) (the rows will contain the data)
//   })
//   .catch((err) => { // if an error occurs while executing the query
//     console.log(err); // log the error to the console
//   });

app.use(errorController.get404); // use the error controller to handle 404 errors (it'll be used for all the requests)

// mongoConnect  // connect to the database
//   .connect()  // connect to the database
//   .then((result) => { // if the connection is successful
//     console.log("Connected"); // log the message to the console
//     console.log(result); // log the result to the console (it'll be the client object that we created in the database module)
//     _db = result.db(); // set the database to the client object (it'll be used to execute queries to the database )
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// mongoConnect(() => {
//   app.listen(5000);
// });

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected! Khush ho jao!");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   //.sync ({ force: true})
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//     // sync the models with the database
//     //console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Abhisekh", email: "dummyemail@gmail.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     //console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//app.listen(3000); // listen on port 3000
