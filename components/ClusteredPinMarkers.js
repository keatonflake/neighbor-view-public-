import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import PinMarker from "./PinMarker";

const ClusteredPinMarkers = ({ pins }) => {
  const [markers, setMarkers] = useState({});
  const [selectedTreeKey, setSelectedTreeKey] = useState(null);

  const selectedTree = useMemo(() => {
    return pins && selectedTreeKey
      ? pins.find((t) => t.key === selectedTreeKey)
      : null;
  }, [pins, selectedTreeKey]);

  // Create the MarkerClusterer once the map is available
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  // Update markers when the MarkerClusterer or markers change
  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // Track markers currently on the map
  const setMarkerRef = useCallback((marker, key) => {
    setMarkers((currentMarkers) => {
      // If the marker exists and is the same, do nothing
      if (marker && currentMarkers[key] === marker) {
        return currentMarkers;
      }

      // If the marker is defined, add or update it
      if (marker) {
        return { ...currentMarkers, [key]: marker };
      }

      // If the marker is removed, create a new object without that key
      const { [key]: _, ...newMarkers } = currentMarkers;
      return newMarkers;
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, []);

  const handleMarkerClick = useCallback((tree) => {
    setSelectedTreeKey(tree.key);
  }, []);

  return (
    <>
      {pins.map((pin, index) => (
        <PinMarker
          key={pin.key || `fallback-key-${index}`} // Ensure uniqueness
          pin={pin}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedTree &&
        markers[selectedTreeKey] && ( // Ensure selectedTree is valid and marker exists
          <InfoWindow
            anchor={markers[selectedTreeKey]}
            onCloseClick={handleInfoWindowClose}
          >
            {/* Display relevant details from the selected pin */}
            <div>
              <h2>{selectedTree.type}</h2>
              <p>{selectedTree.description}</p>
              {/* Add more details as needed */}
            </div>
          </InfoWindow>
        )}
    </>
  );
};

export default ClusteredPinMarkers;
