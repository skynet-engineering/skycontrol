import React from 'react';
import PropTypes from 'prop-types';
import { colors, Text } from 'react-elemental';
import Marker from 'app/react/components/map/marker';
import MapRoot from 'app/react/components/map/map-root';
import { MAP_TYPE_SIMPLE, MAP_TYPE_SATELLITE } from 'app/redux/reducers/options';

const infoKeyText = (isOnline) => (key) => (isOnline ? key : `Last known ${key}`);

/**
 * Display of all drones as markers on a map.
 */
const DroneMap = ({
  mapType,
  isLoaded,
  droneStatus,
  isOnline,
  expandedVisibility,
  selectedDrone,
  onSelectDrone,
}) => {
  const markers = Object.keys(droneStatus).map((droneIP) => {
    const {
      lat,
      lon,
      alt,
      airspeed,
      heading,
      status,
    } = droneStatus[droneIP];
    const online = isOnline[droneIP];
    const keyMap = infoKeyText(online);
    const color = (() => {
      if (online) {
        return droneIP === selectedDrone ? colors.green : colors.primary;
      }
      return colors.red;
    })();

    return (
      <Marker
        key={droneIP}
        expanded={expandedVisibility}
        color={color}
        lat={lat}
        lng={lon}
        info={[
          { key: 'Drone IP', value: droneIP, persistent: true },
          { key: keyMap('Location'), value: `(${lat},\u00A0${lon})` },
          { key: keyMap('Altitude'), value: `${alt} m` },
          { key: keyMap('Airspeed'), value: `${airspeed.toFixed(3)} m/s` },
          { key: keyMap('Heading'), value: `${heading} degrees` },
          { key: keyMap('Status'), value: status },
        ]}
      />
    );
  });

  const footer = !isLoaded && (
    <Text color="primary" secondary uppercase bold>
      Searching for drones...
    </Text>
  );

  return (
    <MapRoot
      mapType={mapType}
      onSelectDrone={onSelectDrone}
      markers={markers}
      footer={footer}
      style={{
        height: '100vh',
        width: '100%',
        transition: 'all 0.15s ease',
      }}
    />
  );
};

DroneMap.propTypes = {
  mapType: PropTypes.oneOf([MAP_TYPE_SIMPLE, MAP_TYPE_SATELLITE]).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  droneStatus: PropTypes.object.isRequired,
  isOnline: PropTypes.object.isRequired,
  expandedVisibility: PropTypes.bool.isRequired,
  selectedDrone: PropTypes.string,
  onSelectDrone: PropTypes.func.isRequired,
};

DroneMap.defaultProps = {
  selectedDrone: null,
};

export default DroneMap;
