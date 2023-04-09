const express = require("express"); // import the express module

const authController = require("../controllers/auth"); // import the auth controller (it'll be used to handle the requests)

const router = express.Router(); // create a router object to handle the routes (GET and POST requests)

router.get("/login", authController.getLogin); // get the login page

router.get('/signup', authController.getSignup);

router.post("/login", authController.postLogin); // get the signup page

router.post('/signup', authController.postSignup);

router.post("/logout", authController.postLogout); // get the signup page 

module.exports = router; // export the router object