const express = require("express"); // import the express module
const bodyParser = require("body-parser"); // import the body-parser module
const path = require("path"); // import the path module
//const expressHbs = require("express-handlebars"); // import the express-handlebars module

const adminData = require("./routes/admin"); // import the admin routes
const shopRoutes = require("./routes/shop"); // import the shop routes

const app = express(); // create an express app

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

app.use(bodyParser.urlencoded({ extended: false })); // use the body-parser module
app.use(express.static(path.join(__dirname, "public"))); // use the public directory

app.use("/admin", adminData.routes); // use the admin routes
app.use(shopRoutes); // use the shop routes

app.use((req, res, next) => {
  // use the 404 page
  res.status(404).render("404", {
    pageTitle: "Page not found", // pass the page title to the 404 page
    path: "/404", // pass the path to the 404 page
  }); // render the 404 page
});

app.listen(3000); // listen on port 3000
