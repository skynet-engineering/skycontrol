import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import customStyles from 'app/react/components/map/map-style';
import Skynet from 'app/react/components/logo/skynet';
import { MAP_TYPE_SIMPLE, MAP_TYPE_SATELLITE } from 'app/redux/reducers/options';

const RICE_GPS_COORDINATES = [29.717393, -95.405422];

export default class MapRoot extends Component {
  static propTypes = {
    mapType: PropTypes.oneOf([MAP_TYPE_SIMPLE, MAP_TYPE_SATELLITE]).isRequired,
    markers: PropTypes.array,
    footer: PropTypes.node,
    style: PropTypes.object,
    onSelectDrone: PropTypes.func.isRequired,
  };

  static defaultProps = {
    markers: [],
    footer: null,
    style: {},
  };

  componentWillReceiveProps(nextProps) {
    const { mapType: currentMapType } = this.props;
    const { mapType: nextMapType } = nextProps;

    // The abstraction provided by google-map-react does not properly call the internal imperative
    // methods to effect changes in map state when the map type option changes. So, to sidestep this
    // problem, we'll intercept the change in map type in the component lifecycle and manually
    // invoke the imperative logic using the native Google Maps API to update the map type.
    if (currentMapType !== nextMapType && this.google) {
      this.google.map.setMapTypeId(nextProps.mapType);
    }
  }

  setGoogleMapsNativeAPI = (google) => {
    this.google = google;
  };

  handleMarkerClick = (droneIP) => this.props.onSelectDrone(droneIP);

  render() {
    const { markers, footer, style } = this.props;

    const baseOptions = {
      fullscreenControl: false,
      styles: customStyles,
    };

    return (
      <div style={style}>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: 'en',
            region: 'us',
            v: '3.30',
          }}
          center={RICE_GPS_COORDINATES}
          zoom={16}
          onChildClick={this.handleMarkerClick}
          options={baseOptions}
          onGoogleApiLoaded={this.setGoogleMapsNativeAPI}
          yesIWantToUseGoogleMapApiInternals
        >
          {markers}
        </GoogleMap>

        <Skynet
          style={{
            bottom: 0,
            height: '20px',
            opacity: '0.8',
            padding: '10px',
            position: 'absolute',
          }}
        />

        <div
          style={{
            bottom: '60px',
            display: 'inline',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {footer}
        </div>
      </div>
    );
  }
}
