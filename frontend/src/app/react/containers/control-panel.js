import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Spacing, Text } from 'react-elemental';
import MissionControlContainer from 'app/react/containers/mission-control';
import ActiveMissionsContainer from 'app/react/containers/active-missions';

/**
 * Per-drone control panel container.
 */
const ControlPanelContainer = ({ droneIP, selectedMission, collapse }) => (
  <Spacing
    style={{
      boxSizing: 'content-box',
      height: '100vh',
      overflowY: 'auto',
      width: '50%',
    }}
    size="huge"
    left
    right
    padding
  >
    <Spacing size="large" top bottom padding>
      <Spacing size="large" bottom>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Text color="gray60" secondary uppercase bold inline>
              Control Panel
            </Text>
            <Text color="gray40" secondary uppercase inline>
              {`\u00A0/\u00A0Skyserve at ${droneIP}`}
            </Text>
          </div>
          <div>
            <Button
              onClick={collapse}
              size="gamma"
              text="Collapse"
              secondary
            />
          </div>
        </div>
      </Spacing>

      <div>
        {selectedMission ? (
          <MissionControlContainer
            droneIP={droneIP}
            mission={selectedMission}
          />
        ) : (
          <ActiveMissionsContainer
            droneIP={droneIP}
          />
        )}
      </div>
    </Spacing>
  </Spacing>
);

ControlPanelContainer.propTypes = {
  droneIP: PropTypes.string.isRequired,
  selectedMission: PropTypes.string,
  collapse: PropTypes.func.isRequired,
};

ControlPanelContainer.defaultProps = {
  selectedMission: null,
};

const mapStateToProps = ({ drone }) => ({
  selectedMission: drone.selectedMission,
});

export default connect(mapStateToProps)(ControlPanelContainer);
