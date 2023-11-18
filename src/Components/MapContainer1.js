import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [clickedLocationDetails, setClickedLocationDetails] = useState(null);
  const [polygonArea, setPolygonArea] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [featureData, setFeatureData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    let polygonLayer;
    let userMarker;
    const googleIcon = L.icon({
      iconUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
      iconSize: [38, 48],
      iconAnchor: [24, 48],
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const newCoordinate = [lat, lng];

      const updatedCoordinates = [...polygonCoordinates, newCoordinate];
      setPolygonCoordinates(updatedCoordinates);

      if (polygonLayer) {
        map.removeLayer(polygonLayer);
      }

      if (updatedCoordinates.length > 2) {
        const area = L.GeometryUtil.geodesicArea(updatedCoordinates);
        setPolygonArea(area);
      } else {
        setPolygonArea(0);
      }

      if (updatedCoordinates.length > 1 && !isDrawing) {
        polygonLayer = L.polygon(updatedCoordinates, { color: 'red' }).addTo(map);
      }

      setClickedLocationDetails(`Latitude: ${lat}, Longitude: ${lng}`);

      const clickedMarker = L.marker([lat, lng], { icon: googleIcon, draggable: true }).addTo(map);
      clickedMarker.on('click', () => {
        clickedMarker.remove();
        setClickedLocationDetails(null);
        const filteredCoordinates = updatedCoordinates.filter(coord => coord[0] !== lat && coord[1] !== lng);
        setPolygonCoordinates(filteredCoordinates);
        if (polygonLayer) {
          map.removeLayer(polygonLayer);
        }
        if (filteredCoordinates.length > 1) {
          polygonLayer = L.polygon(filteredCoordinates, { color: 'blue' }).addTo(map);
        }
      });

      if (isDrawing) {
        const corner1 = [lat, lng];
        const corner2 = [lat + 0.05, lng + 0.05]; 

        if (polygonLayer) {
          map.removeLayer(polygonLayer);
        }

        polygonLayer = L.rectangle([corner1, corner2], { color: 'green' }).addTo(map);
      }
    });

    map.on('load', () => {
      console.log('Map has finished loading');
    });

    map.on('locationfound', (e) => {
      const { lat, lng } = e.latlng;
      setUserLocation([lat, lng]);

      if (userMarker) {
        map.removeLayer(userMarker);
      }
      userMarker = L.marker([lat, lng], { icon: googleIcon }).addTo(map);
    });

    map.on('locationerror', (e) => {
      console.log(e.message);
    });

    map.locate({ setView: true, maxZoom: 16 });

    return () => {
      map.remove();
    };
  }, [isDrawing]);

  const handleFeatureData = (data) => {
    setFeatureData(data);
  };

  return (
    <div style={{ height: 'auto', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '1200px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  <h2>Farming and Agricultural Practices</h2>
  <p>
    Agriculture forms the backbone of communities, cultivating crops and fostering sustainable farming methods. 
    Streamlined delivery channels from farmers to consumers guarantee access to fresh, nutrient-rich produce, 
    bolstering healthier lifestyles and backing regional economies.
  </p>
  <p>
    Direct farm-to-consumer supply chains and optimized logistical networks bridge the divide between 
    producers and buyers, ensuring transparent and high-quality food distribution.
  </p>
  <p>
    Granting direct consumer access to farm-fresh goods nurtures a profound comprehension of food origins, 
    promotes sustainability, and fortifies the local agricultural landscape.
  </p>
</div>

      <div
        style={{
          width: '95%',
          height: '400px', 
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginTop: '30px',
        }}
        ref={mapContainerRef}
      />
      
      {clickedLocationDetails && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fff', padding: '8px', borderRadius: '4px', zIndex: 1000 }}>
          {clickedLocationDetails}
        </div>
      )}
      {polygonArea > 0 && (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#fff', padding: '8px', borderRadius: '4px', zIndex: 1000 }}>
          Area: {polygonArea} square meters
        </div>
      )}
      {userLocation && (
        <div style={{ position: 'absolute', top: '60px', left: '10px', background: '#fff', padding: '8px', borderRadius: '4px', zIndex: 1000 }}>
          Current Location: {userLocation[0]}, {userLocation[1]}
        </div>
      )}
      {featureData && (
        <div style={{ position: 'absolute', top: '60px', right: '10px', background: '#fff', padding: '8px', borderRadius: '4px', zIndex: 1000 }}>
          <h3>Feature Data</h3>
          
        </div>
      )}
      <button style={{ marginTop: '20px' }} onClick={() => setIsDrawing(!isDrawing)}>
        {isDrawing ? 'Cancel Drawing' : 'Start Drawing'}
      </button>
    </div>
  );
};

export default MapContainer;
