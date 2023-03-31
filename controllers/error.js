exports.get404 = (req, res, next) => {
  // create a function to handle 404 errors (page not found) (middleware)
  res.status(404).render("404", {
    // set the status code to 404 and render the 404 page (views\404.ejs)
    pageTitle: "Page not found", // pass the page title to the 404 page
    path: "/404", // pass the path to the 404 page
  });
};
