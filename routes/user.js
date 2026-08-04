const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveredirectUrl } = require("../middleware");
const userControllers = require("../controllers/users.js");


router
    .route("/signup")
    .get(userControllers.renderSignupForm)
    .post(wrapAsync(userControllers.signup)
);

router
    .route("/login")
    .get(userControllers.renderLoginForm)
    .post(saveredirectUrl, passport.authenticate("local",
    {
        failureRedirect: '/login',
        failureFlash: true 
    }), 
    userControllers.login
);

router.get("/logout", userControllers.logout);


module.exports = router;