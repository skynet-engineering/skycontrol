import React from 'react';
import PropTypes from 'prop-types';
import Command from 'app/react/components/control-panel/command';
import withResource from 'app/react/hoc/with-resource';

/**
 * Container for the interface allowing direct mission commands.
 */
const CommandContainer = ({ sendRequest, endpoints: { data = {} } }) => (
  <Command
    sendRequest={sendRequest}
    endpoints={data.endpoints || []}
  />
);

CommandContainer.propTypes = {
  sendRequest: PropTypes.func.isRequired,
  endpoints: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
};

export default withResource({
  key: 'endpoints',
  endpoint: '/api/skymission/_/endpoints',
  method: 'POST',
  data: ({ mission, droneIP }) => ({ drone_ip: droneIP, mission_id: mission }),
})(CommandContainer);
