import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedMission } from 'app/redux/actions/drone';
import ActiveMissions from 'app/react/components/control-panel/active-missions';
import withResource from 'app/react/hoc/with-resource';

/**
 * Container for reading all active missions via resource.
 */
const ActiveMissionsContainer = ({
  controlMission,
  activeMissions: { isLoaded, data = {} },
}) => (
  <ActiveMissions
    isLoaded={isLoaded}
    missions={data.missions || []}
    controlMission={controlMission}
  />
);

ActiveMissionsContainer.propTypes = {
  controlMission: PropTypes.func.isRequired,
  activeMissions: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    data: PropTypes.object,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  controlMission: (missionID) => dispatch(setSelectedMission(missionID)),
});

export default compose(
  connect(null, mapDispatchToProps),
  withResource({
    key: 'activeMissions',
    endpoint: '/api/skyserve/active-missions',
    method: 'POST',
    data: ({ droneIP }) => ({ drone_ip: droneIP }),
  }),
)(ActiveMissionsContainer);
