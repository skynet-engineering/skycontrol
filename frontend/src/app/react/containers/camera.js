import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dottie from 'dottie';
import Camera from 'app/react/components/control-panel/camera';
import withResource from 'app/react/hoc/with-resource';
import skynetLogo from 'resources/img/skynet-logo';

/**
 * Periodic refresh requests to the camera API for capturing a live image.
 */
class CameraContainer extends Component {
  static propTypes = {
    refreshInterval: PropTypes.number,
    camera: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
      retry: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    refreshInterval: 5000,
  };

  componentWillUpdate(nextProps) {
    const { refreshInterval, camera } = this.props;

    if (!camera.isLoaded && nextProps.camera.isLoaded) {
      // Trigger a refresh after the image has finished loading.
      this.image = dottie.get(nextProps, ['camera', 'data', 'image'], skynetLogo);
      setTimeout(camera.retry, refreshInterval);
    }
  }

  image = null;

  render() {
    return (
      <Camera image={this.image} />
    );
  }
}

export default withResource({
  key: 'camera',
  endpoint: '/api/skyserve/camera',
  method: 'POST',
  data: ({ droneIP }) => ({ drone_ip: droneIP }),
})(CameraContainer);
