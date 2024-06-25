let map = L.map("map").setView([49.8037633, 15.4749126], 8);

let ortofoto = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
});

let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

var sellerIcon = L.icon({
    iconUrl: "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png",
    iconSize: [35, 35],
});

var museumIcon = L.icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Map_symbol_museum_02.png",
    iconSize: [35, 35],
});

let museumsArray = [];
let sellersArray = [];

osm.addTo(map);
fetchJSONData();

async function fetchJSONData() {
    try {
        const res = await fetch("museums.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        museumsArray = data;
        console.log(museumsArray);
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }

    try {
        const res = await fetch("sellers.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        sellersArray = data;
        console.log(sellersArray);
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }

    let museumMarkers = L.markerClusterGroup();
    let sellerMarkers = L.markerClusterGroup();

    museumsArray.forEach((e) => {
        let marker = L.marker([e.lat, e.lng], { icon: museumIcon });
        let popupContent = `
            <div class="title"><h2>Název:</h2> ${e.title}</div>
            <div class="title"><h2>Adresa:</h2> ${e.address}</div>
            <div class="title"><h2>Město:</h2> ${e.city}</div>
        `;
        marker.bindPopup(popupContent);
        museumMarkers.addLayer(marker);
    });

    sellersArray.forEach((e) => {
        let marker = L.marker([e.lat, e.lng], { icon: sellerIcon });
        let popupContent = `
            <div class="title"><h2>Název:</h2> ${e.title}</div>
            <div class="title"><h2>Adresa:</h2> ${e.address}</div>
            <div class="title"><h2>Město:</h2> ${e.city}</div>
        `;
        marker.bindPopup(popupContent);
        sellerMarkers.addLayer(marker);
    });

    map.addLayer(museumMarkers);
    map.addLayer(sellerMarkers);

    let baseLayers = {
        OpenStreetMap: osm,
        Ortofoto: ortofoto,
    };

    let overLayers = {
        Museums: museumMarkers,
        Sellers: sellerMarkers,
    };

    L.control.layers(baseLayers, overLayers).addTo(map);
}
