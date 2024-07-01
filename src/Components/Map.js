import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CustomMarker from '../Images/marker.png';

const containerStyle = {
  width: '99vw',
  height: '85vh'
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const markers = [
  {
    lat: 7.027853226,
    lng: 79.92017886,
    carMake: 'Honda',
    carBrand: 'Civic',
    yearOfManufacture: 2020
  }
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAI5tY4ZoE20cclQhqy67kw9wnV-Uoytww" 
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false
      }}
    >
      {markers.map((mark, i) => (
        <Marker
          key={i}
          position={{ lat: mark.lat, lng: mark.lng }}
          icon={{
            url: CustomMarker,
            scaledSize: new window.google.maps.Size(60, 60),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20) // Center the icon
          }}
          onClick={() => handleMarkerClick(mark)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={handleCloseClick}
        >
          <div>
            <h2>Car Information</h2>
            <p>Car make: {selectedMarker.carMake}</p>
            <p>Car brand: {selectedMarker.carBrand}</p>
            <p>Year of Manufacture: {selectedMarker.yearOfManufacture}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent);
