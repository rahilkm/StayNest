const axios = require("axios");

const API_KEY = process.env.ORS_API_KEY;

async function getCoordinates(location) {
    try {
        const response = await axios.get(
            "https://api.heigit.org/pelias/v1/search",
            {
                headers: {
                    Authorization: API_KEY,
                },
                params: {
                    text: location,
                    size: 1,
                },
            }
        );

        const features = response.data.features;

        if (!features.length) {
            throw new Error("Location not found");
        }

        return {
            type: "Point",
            coordinates: features[0].geometry.coordinates,
        };
    } catch (err) {
        console.log(err.response?.data || err.message);
        throw err;
    }
}

module.exports = getCoordinates;