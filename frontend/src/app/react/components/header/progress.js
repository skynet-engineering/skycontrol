import React from 'react';
import PropTypes from 'prop-types';
import { LoadingBar } from 'react-elemental';

const Progress = ({ isLoading }) => (
  <div style={{ position: 'absolute', width: '100%', zIndex: 2 }}>
    {isLoading && <LoadingBar thickness={3} style={{ position: 'absolute' }} />}
  </div>
);

Progress.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Progress;
