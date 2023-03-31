const express = require("express"); // import the express module
const bodyParser = require("body-parser"); // import the body-parser module
const path = require("path"); // import the path module
//const expressHbs = require("express-handlebars"); // import the express-handlebars module

const adminRoutes = require("./routes/admin"); // import the admin routes (it'll be used for all the requests that start with /admin)
const shopRoutes = require("./routes/shop"); // import the shop routes (it'll be used for all the requests)
const errorController = require("./controllers/error"); // import the error controller (it'll be used for all the requests)

const app = express(); // create an express app object from the express module (it'll be used to handle the requests)

/*app.engine(
  // set the view engine to handlebars and set the extension to 
  "hbs", // set the extension to hbs
  expressHbs({ 
    // set the handlebars options 
    layoutsDir: "views/layouts/", // set the layouts directory to views/layouts 
    defaultLayout: "main-layout", // set the default layout to main-layout 
    extname: "hbs", // set the extension to hbs 
  })
);*/

//app.set("view engine", "hbs"); // set the view engine to handlebars
//app.set('view engine', 'pug'); // set the view engine to pug
app.set("view engine", "ejs"); // set the view engine to ejs
app.set("views", "views"); // set the views directory to views

app.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module to parse the request body (it'll be used for all the requests)
app.use(express.static(path.join(__dirname, "public"))); // use the public directory to serve static files (css, js, images, etc.)

app.use("/admin", adminRoutes); // use the admin routes with /admin prefix (it'll be used for all the requests that start with /admin)
app.use(shopRoutes); // use the shop routes (it'll be used for all the requests)

app.use(errorController.get404); // use the error controller to handle 404 errors (it'll be used for all the requests)

app.listen(3000); // listen on port 3000
