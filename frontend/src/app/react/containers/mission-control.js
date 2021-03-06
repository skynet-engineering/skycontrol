import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { colors, Alert, Spacing, Tabs, Tag, Text } from 'react-elemental';
import { startProgress, endProgress } from 'app/redux/actions/progress';
import { setSelectedMission } from 'app/redux/actions/drone';
import BackNav from 'app/react/components/ui/back-nav';
import CameraContainer from 'app/react/containers/camera';
import CommandContainer from 'app/react/containers/command';
import EventLogContainer from 'app/react/containers/event-log';
import withResource from 'app/react/hoc/with-resource';
import resource from 'app/util/resource';

const TAB_COMMAND = 'command';
const TAB_EVENT_LOG = 'event-log';
const TAB_CAMERA = 'camera';

const TAB_TEXT = {
  [TAB_COMMAND]: 'COMMAND',
  [TAB_EVENT_LOG]: 'EVENT LOG',
  [TAB_CAMERA]: 'CAMERA',
};

/**
 * Container for mission control, abstracting out network logic for sending commands to the drone's
 * mission instance.
 */
class MissionControlContainer extends Component {
  static propTypes = {
    droneIP: PropTypes.string.isRequired,
    mission: PropTypes.string.isRequired,
    startResource: PropTypes.func.isRequired,
    endResource: PropTypes.func.isRequired,
    clearMission: PropTypes.func.isRequired,
    skyserveVersion: PropTypes.shape({
      data: PropTypes.object,
    }).isRequired,
    skymissionVersion: PropTypes.shape({
      data: PropTypes.object,
    }).isRequired,
  };

  state = {
    tab: TAB_COMMAND,
    response: null,
  };

  sendRequest = (endpoint, data = {}) => {
    const {
      droneIP,
      mission,
      startResource,
      endResource,
    } = this.props;

    const opts = {
      endpoint: `/api/skymission${endpoint}`,
      method: 'POST',
      data: {
        drone_ip: droneIP,
        mission_id: mission,
        data,
      },
    };

    this.setState({ response: null });
    startResource();

    return resource(opts, (err, response = null) => {
      this.setState({ response });
      endResource();
    });
  };

  handleChange = (tab) => this.setState({ tab });

  render() {
    const {
      droneIP,
      mission,
      clearMission,
      skymissionVersion: { data: skymissionVersionData = {} },
      skyserveVersion: { data: skyserveVersionData = {} },
    } = this.props;
    const { tab, response } = this.state;

    const skyserveVersion = skyserveVersionData.version || '?.?.?';
    const skymissionVersion = skymissionVersionData.version || '?.?.?';

    const controlContainers = {
      [TAB_COMMAND]: (
        <CommandContainer
          droneIP={droneIP}
          mission={mission}
          sendRequest={this.sendRequest}
        />
      ),
      [TAB_EVENT_LOG]: (
        <EventLogContainer
          droneIP={droneIP}
          mission={mission}
        />
      ),
      [TAB_CAMERA]: (
        <CameraContainer
          droneIP={droneIP}
        />
      ),
    };

    return (
      <div>
        {response && (
          <Spacing size="small" bottom>
            <Alert
              size="beta"
              type="success"
              title="Request completed successfully."
              message={`Response: ${JSON.stringify(response)}`}
            />
          </Spacing>
        )}

        <Spacing size="small" bottom>
          <BackNav onClick={clearMission} />
        </Spacing>

        <Spacing size="large" bottom>
          <Text size="beta">
            {mission}
          </Text>
          {[`Skyserve ${skyserveVersion}`, `Skymission ${skymissionVersion}`].map((tag) => (
            <Spacing key={tag} size="tiny" right inline>
              <Tag
                key={tag}
                outlineColor={colors.green}
                backgroundColor={colors.greenLight}
                text={tag}
              />
            </Spacing>
          ))}
        </Spacing>

        <Spacing bottom>
          <Tabs
            value={tab}
            options={[
              { value: TAB_COMMAND, label: TAB_TEXT[TAB_COMMAND] },
              { value: TAB_EVENT_LOG, label: TAB_TEXT[TAB_EVENT_LOG] },
              { value: TAB_CAMERA, label: TAB_TEXT[TAB_CAMERA] },
            ]}
            onChange={this.handleChange}
          />
        </Spacing>

        {controlContainers[tab]}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearMission: () => dispatch(setSelectedMission(null)),
  startResource: () => dispatch(startProgress()),
  endResource: () => dispatch(endProgress()),
});

export default compose(
  connect(null, mapDispatchToProps),
  withResource({
    key: 'skyserveVersion',
    endpoint: '/api/skyserve/version',
    method: 'POST',
    data: ({ droneIP }) => ({ drone_ip: droneIP }),
  }),
  withResource({
    key: 'skymissionVersion',
    endpoint: '/api/skymission/_/version',
    method: 'POST',
    data: ({ droneIP, mission }) => ({ drone_ip: droneIP, mission_id: mission }),
  }),
)(MissionControlContainer);
