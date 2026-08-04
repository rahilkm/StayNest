const mapElement = document.getElementById("map");

const coordinates = JSON.parse(mapElement.dataset.coordinates);
const title = mapElement.dataset.title;
const listingLocation = mapElement.dataset.location;

const [lng, lat] = coordinates;

const map = L.map("map").setView([lat, lng], 13);

map.scrollWheelZoom.disable();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`
        <strong>${title}</strong><br>
        ${listingLocation}
    `)
.openPopup();