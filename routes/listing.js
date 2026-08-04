const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync (listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing,  wrapAsync (listingController.createListing)
);

//new route
router.get("/new", isLoggedIn, wrapAsync (listingController.renderNewForm));

router
.route("/:id")
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListings))
.get(wrapAsync (listingController.showListings)
);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;