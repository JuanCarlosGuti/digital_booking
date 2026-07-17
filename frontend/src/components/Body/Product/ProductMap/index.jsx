import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./ProductMap.scss";

// Bajo Vite el ícono default de Leaflet sale roto (busca los PNG por ruta relativa al CSS):
// hay que registrar las imágenes importadas explícitamente.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/** Mapa OpenStreetMap del municipio de la propiedad (las coordenadas son del municipio,
 * no del inmueble — por eso la sección se llama "Zona de la propiedad"). */
export default function ProductMap({ city, title }) {
  if (!city || city.latitude == null || city.longitude == null) {
    return null;
  }

  const position = [city.latitude, city.longitude];

  return (
    <div className="prodMap">
      <div className="prodMap__container">
        <h3>Zona de la propiedad</h3>
        <p className="prodMap__place">
          {city.city}, {city.department}
        </p>
        <div className="prodMap__mapBox">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="prodMap__map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>{title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
