import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DroneMap from 'app/react/components/drone-map';
import withResource from 'app/react/hoc/with-resource';
import withOptions from 'app/react/hoc/with-options';
import resource from 'app/util/resource';
import { setSelectedDrone } from 'app/redux/actions/drone';

// Interval, in ms, between each flight status refresh request.
const FLIGHT_STATUS_REFRESH_INTERVAL = 500;

/**
 * Container abstracting drone discovery and flight status updates.
 */
class DroneMapContainer extends Component {
  static propTypes = {
    drones: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      data: PropTypes.array,
    }).isRequired,
    options: PropTypes.shape({
      expandedVisibility: PropTypes.bool.isRequired,
    }).isRequired,
    isFullView: PropTypes.bool.isRequired,
    selectedDrone: PropTypes.string,
    onSelectDrone: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedDrone: null,
  };

  state = { droneStatus: {}, isOnline: {} };

  componentDidUpdate(prevProps) {
    const { drones: { isLoaded: isNowLoaded, data: drones = [] } } = this.props;

    if (!prevProps.drones.isLoaded && isNowLoaded) {
      drones.map(({ ip }) => ip).forEach(this.refreshFlightStatus.bind(this));
    }
  }

  componentWillUnmount() {
    Object.values(this.timeouts).forEach((timeout) => clearTimeout(timeout));
  }

  timeouts = {};

  refreshFlightStatus(droneIP) {
    resource({
      endpoint: '/api/skyserve/flight-status',
      method: 'POST',
      data: { drone_ip: droneIP },
    }, (err, flightStatus) => {
      if (err) {
        this.setState({
          isOnline: {
            ...this.state.isOnline,
            [droneIP]: false,
          },
        });
      } else {
        this.setState({
          droneStatus: {
            ...this.state.droneStatus,
            [droneIP]: flightStatus,
          },
          isOnline: {
            ...this.state.isOnline,
            [droneIP]: true,
          },
        });
      }

      this.timeouts[droneIP] = setTimeout(
        () => this.refreshFlightStatus(droneIP),
        FLIGHT_STATUS_REFRESH_INTERVAL,
      );
    });
  }

  render() {
    const {
      drones: { isLoaded },
      options: { expandedVisibility, mapType },
      isFullView,
      selectedDrone,
      onSelectDrone,
    } = this.props;
    const { droneStatus, isOnline } = this.state;

    const containerStyle = {
      width: isFullView ? '100%' : '50%',
    };

    return (
      <div style={containerStyle}>
        <DroneMap
          mapType={mapType}
          isLoaded={isLoaded}
          droneStatus={droneStatus}
          isOnline={isOnline}
          expandedVisibility={expandedVisibility}
          selectedDrone={selectedDrone}
          onSelectDrone={onSelectDrone}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSelectDrone: (droneIP) => dispatch(setSelectedDrone(droneIP)),
});

export default compose(
  withOptions,
  withResource({
    key: 'drones',
    method: 'GET',
    endpoint: '/api/discover',
  }),
  connect(null, mapDispatchToProps),
)(DroneMapContainer);
