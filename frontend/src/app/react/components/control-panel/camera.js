import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';

/**
 * Displays a base64-encoded image.
 */
const Camera = ({ image }) => (
  <div>
    <Spacing bottom>
      <Text color="primary" secondary bold uppercase>Live camera capture</Text>
    </Spacing>

    {image && (
      <img
        src={`data:image/jpg;base64,${image}`}
        style={{ width: '100%' }}
      />
    )}
  </div>
);

Camera.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Camera;
