import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'app/react/components/header';
import Progress from 'app/react/components/header/progress';
import { setExpandedVisibility, setMapType } from 'app/redux/actions/options';
import { MAP_TYPE_SIMPLE, MAP_TYPE_SATELLITE } from 'app/redux/reducers/options';
import withOptions from 'app/react/hoc/with-options';

/**
 * Global header container.
 */
const HeaderContainer = ({
  isLoading,
  selectedDrone,
  expandMarkers,
  contractMarkers,
  setSimpleMap,
  setSatelliteMap,
  options,
}) => (
  <div>
    <Progress isLoading={isLoading} />
    <Header
      droneIP={selectedDrone}
      expandMarkers={expandMarkers}
      contractMarkers={contractMarkers}
      setSimpleMap={setSimpleMap}
      setSatelliteMap={setSatelliteMap}
      options={options}
    />
  </div>
);

HeaderContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedDrone: PropTypes.string,
  expandMarkers: PropTypes.func.isRequired,
  contractMarkers: PropTypes.func.isRequired,
  setSimpleMap: PropTypes.func.isRequired,
  setSatelliteMap: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

HeaderContainer.defaultProps = {
  selectedDrone: null,
};

const mapStateToProps = ({ drone, progress }) => ({
  selectedDrone: drone.selectedDrone,
  isLoading: progress.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  expandMarkers: () => dispatch(setExpandedVisibility(true)),
  contractMarkers: () => dispatch(setExpandedVisibility(false)),
  setSimpleMap: () => dispatch(setMapType(MAP_TYPE_SIMPLE)),
  setSatelliteMap: () => dispatch(setMapType(MAP_TYPE_SATELLITE)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withOptions,
)(HeaderContainer);
