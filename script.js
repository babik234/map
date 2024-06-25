let map = L.map("map").setView([49.8037633, 15.4749126], 8);

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

const museumsArray = [];
const sellersArray = [];
osm.addTo(map);
fetchJSONData();

async function fetchJSONData() {
    try {
        const res = await fetch("museums.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        museumsArray.push(...data); // Spread the array elements into museumsArray
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
        sellersArray.push(...data); // Spread the array elements into museumsArray
        console.log(sellersArray);
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
    museumsArray.forEach((e) => {
        let lng = e.lng;
        let lat = e.lat;
        let title = e.title;
        let address = e.address;
        let city = e.city;
        let marker = L.marker([lat, lng], { icon: museumIcon });
        popupContent = L.popup([lat, lng], {
            content: `
          <div  class="title"> <p><h2>Název:</h2> ${title}</p> </br></div>
             <div  class="title"> <p><h2>Adresa:</h2> ${address}</p> </br> </div>
               <div  class="title"> <p><h2>Město:</h2> ${city}</p> </br> </div>
         
            `,
        });
        marker.bindPopup(popupContent).openPopup();
        marker.addTo(map);
    });

    sellersArray.forEach((e) => {
        let lng = e.lng;
        let lat = e.lat;
        let title = e.title;
        let address = e.address;
        let city = e.city;
        let marker = L.marker([lat, lng], { icon: sellerIcon });
        popupContent = L.popup([lat, lng], {
            content: `
            <div  class="title"> <p><h2>Název:</h2> ${title}</p> </br></div>
             <div  class="title"> <p><h2>Adresa:</h2> ${address}</p> </br> </div>
               <div  class="title"> <p><h2>Město:</h2> ${city}</p> </br> </div>
         
      
            `,
        });
        marker.bindPopup(popupContent).openPopup();
        marker.addTo(map);
    });
}

/*
let ortofoto = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
});

ortofoto.addTo(map);
*/
