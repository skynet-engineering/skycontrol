import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';

/**
 * Display a list of event logs in ascending chronological order.
 */
const EventLog = ({ messages }) => (
  <div>
    <Spacing bottom>
      <Text color="primary" secondary bold uppercase>Mission event log</Text>
    </Spacing>

    {messages.map(({ message, idx }) => (
      <Text key={idx} size="kilo">{message}</Text>
    ))}
  </div>
);

EventLog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
  })).isRequired,
};

export default EventLog;
