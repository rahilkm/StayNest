require("dotenv").config();
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const getCoordinates = require("../utils/geocoder.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/StayNest";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});

    const listings = [];

    for (let listing of initdata.data) {
        const geometry = await getCoordinates(listing.location);

        listings.push({
            ...listing,
            owner: "6a6f6ba6bf4075d6a76f7096",
            geometry,
        });
    }

    await Listing.insertMany(listings);

    console.log("Data initialized with coordinates!");
};

initDB();