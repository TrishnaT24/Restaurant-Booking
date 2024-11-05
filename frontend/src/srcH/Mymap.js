//import "./mymap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

// create custom icon for regular markers
const customIcon = new Icon({
  iconUrl: require("../images/iconn.png"),
  iconSize: [38, 38], // size of the icon
});

// create custom icon for restaurant markers
const restaurantIcon = new Icon({
  iconUrl: require("../images/iconn.png"), // path to the restaurant icon
  iconSize: [38, 38], // size of the icon
});

// create custom icon for hospital markers
// const hospitalIcon = new Icon({
//   iconUrl: require("../src/decor.png"), // path to the hospital icon
//   iconSize: [38, 38] // size of the icon
// });

// // create custom icon for park markers
// const parkIcon = new Icon({
//   iconUrl: require("../src/catering.png"), // path to the park icon
//   iconSize: [38, 38] // size of the icon
// });

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: <span class="cluster-icon">${cluster.getChildCount()}</span>, // corrected to use template string
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// restaurants
const restaurants = [
  {
    geocode: [19.085001, 72.829998],
    name: "One8",
    link: "https://www.google.com/maps/place/One8+Commune,+Juhu/@19.0895498,72.8267812,18z/data=!4m6!3m5!1s0x3be7c96f0849c345:0x6e0276cc57b4b0ab!8m2!3d19.0895888!4d72.8279571!16s%2Fg%2F11t9k1wcs2?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    popUp: "One8",
  },
  {
    geocode: [19.057351, 72.999946],
    name: "SAZiO",
    link: "https://www.google.com/maps/place/SAZiO+-+The+Lounge+%26+Sports+Bar,+Sanpada/@19.0573514,72.9999463,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c1218bdb1783:0xda45f6f7561bb24b!8m2!3d19.0573514!4d73.0025212!16s%2Fg%2F11w28l2k2l?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    popUp: "SAZiO",
  },
  {
    geocode: [19.220508, 72.838573],
    name: "Banana Leaf",
    link: "https://www.google.com/maps/place/Banana+Leaf+Restaurant+borivali/@19.2205085,72.8385737,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b12d46ef75e7:0xd4570e1724eb9127!8m2!3d19.2205085!4d72.8411486!16s%2Fg%2F11f3m806yc?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    popUp: "Banana Leaf",
  },
  {
    geocode: [19.380008, 72.826339],
    name: "Kubera",
    link: "https://www.google.com/maps/place/Kubera+Veg+Restaurant/@19.3800083,72.8263394,17z/data=!4m7!3m6!1s0x3be7aec01a87a72d:0xae615f4cdcc1626e!4b1!8m2!3d19.3800083!4d72.8289143!16s%2Fg%2F12hqgb9yl?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    popUp: "Kubera",
  },
];

const position = [51.505, -0.09];
export default function Mymap() {
  return (
    <MapContainer center={[19.1136, 72.8697]} zoom={10} style={{width: '900px',height:'500px'}}>
      {/* OpenStreetMap tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the restaurants */}
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            position={restaurant.geocode}
            icon={restaurantIcon}
          >
            <Popup>
              <div>
                <p style={{color:'black'}}>{restaurant.popUp}</p>
                <a
                  href={restaurant.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View location
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
