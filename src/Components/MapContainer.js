import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const useStyles = makeStyles(theme => ({
    mapContainer: {
      width: '95%',
      height: '500px', 
      [theme.breakpoints.down('sm')]: {
        height: '300px', 
      },
      border: '1px solid #ccc', 
      borderRadius: '20px',
      margin: '0 auto', 
      paddingLeft: '20px', 
      paddingRight: '20px',
      marginBottom: '50px', 
    },
    farmingContent: {
      padding: theme.spacing(2),
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginTop: theme.spacing(2),
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        borderRadius: '4px',
      },
    },
  }));

const MapContainer = () => {
  const classes = useStyles();
  const mapRef = useRef(null);
  const [selectedPointsLayer, setSelectedPointsLayer] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    const googleIcon = L.icon({
      iconUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
      iconSize: [38, 48],
      iconAnchor: [24, 48],
    });

    L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    let initialPolygon = null;

    map.on('click', (e) => {
      console.log('Clicked at:', e.latlng);
      const { lat, lng } = e.latlng;

      const popupContent = `Latitude: ${lat.toFixed(6)}<br>Longitude: ${lng.toFixed(6)}`;
      L.marker(e.latlng, { icon: googleIcon }).addTo(map).bindPopup(popupContent).openPopup();

      const selectedCoords = [
        [lat, lng],
      ];

      const selectedPolygon = L.polygon(selectedCoords, { color: 'red' }).addTo(map);

      if (!selectedPointsLayer) {
        setSelectedPointsLayer(L.layerGroup([selectedPolygon]));
      } else {
        selectedPointsLayer.addLayer(selectedPolygon); 
      }

      if (!initialPolygon) {
        const initialCoords = [
          [51.5, -0.09],
          [51.51, -0.1],
          [51.49, -0.1],
        ];

        initialPolygon = L.polygon(initialCoords, { color: 'blue' }).addTo(map);
      }
    });

    const removeSelectedPoints = () => {
      if (selectedPointsLayer) {
        map.removeLayer(selectedPointsLayer);
        setSelectedPointsLayer(null);
      }
    };

    const buttonControl = L.control({ position: 'topleft', color: 'blue' });
    buttonControl.onAdd = () => {
      const button = L.DomUtil.create('button', 'leaflet-bar');
      button.innerHTML = 'Remove Selected Points';
      button.title = 'Remove Selected Points';
      button.onclick = () => {
        removeSelectedPoints();
      };
      return button;
    };
    buttonControl.addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', (e) => {
      const { lat, lng } = e.latlng;

      const popupContent = `Your Location<br>Latitude: ${lat.toFixed(6)}<br>Longitude: ${lng.toFixed(6)}`;
      L.marker([lat, lng], { icon: googleIcon }).addTo(map).bindPopup(popupContent).openPopup();

      const userCoords = [
        [lat, lng],
      ];

      const userPolygon = L.polygon(userCoords, { color: 'green' }).addTo(map);
    });

    map.on('locationerror', (e) => {
      alert('Location access denied');
    });

    return () => {
      map.remove();
    };
  }, [selectedPointsLayer]);

  return (
    <div>
             <div className={classes.farmingContent}>
        <h2>Farming and Crop Delivery</h2>
        <p>
          Farming sustains communities by producing crops and fostering agricultural practices.
          From the farmer's fields to the customer's table, a robust delivery system ensures
          fresh and quality produce reaches consumers.
        </p>
        <p>
          Efforts in logistics and distribution, including transportation networks and market 
          accessibility, play a vital role in delivering farm-fresh products promptly and efficiently.
        </p>
      </div>
      <div ref={mapRef} className={classes.mapContainer} />
     
    </div>
  );};

export default MapContainer;
