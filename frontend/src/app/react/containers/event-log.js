import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventLog from 'app/react/components/control-panel/event-log';
import resource from 'app/util/resource';

// Interval, in ms, to refresh the mission event log.
const EVENT_LOG_REFRESH_INTERVAL = 2000;

/**
 * Container for reading mission event logs and periodically refreshing.
 */
class EventLogContainer extends Component {
  static propTypes = {
    droneIP: PropTypes.string.isRequired,
    mission: PropTypes.string.isRequired,
  };

  state = { messages: [] };

  componentDidMount() {
    this.refreshEventLog();
  }

  refreshEventLog() {
    const { droneIP, mission } = this.props;

    return resource({
      endpoint: '/api/skymission/_/event-log',
      method: 'POST',
      data: {
        drone_ip: droneIP,
        mission_id: mission,
        data: { num_messages: 50 },
      },
    }, (err, messages) => {
      this.setState({ messages: messages.reverse() });
      setTimeout(this.refreshEventLog.bind(this), EVENT_LOG_REFRESH_INTERVAL);
    });
  }

  render() {
    const { messages } = this.state;

    return (
      <EventLog messages={messages.map((message, idx) => ({ message, idx }))} />
    );
  }
}

export default EventLogContainer;
