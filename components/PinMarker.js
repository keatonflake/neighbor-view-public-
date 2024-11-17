import React, { useCallback, useState } from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";

const PinMarker = ({ pin, onClick, setMarkerRef }) => {
  const handleClick = useCallback(() => onClick(pin), [onClick, pin]);
  const ref = useCallback(
    (marker) => setMarkerRef(marker, pin.key),
    [setMarkerRef, pin.key]
  );
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
    handleClick(); // Call your existing onClick handler if needed
  };

  return (
    <AdvancedMarker
      position={pin.position}
      ref={ref}
      onClick={handleMarkerClick}
    >
      {pin.category === "neighborhood" ? (
        <span className="marker-clustering-tree">🚨</span>
      ) : (
        <span className="marker-clustering-tree">🚗</span>
      )}
      {showInfoWindow && (
        <InfoWindow
          position={pin.position}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <div id="pinMessage">{pin.description}</div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PinMarker;
