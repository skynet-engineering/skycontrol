import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import KeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import DroneMapContainer from 'app/react/containers/drone-map';
import ControlPanelContainer from 'app/react/containers/control-panel';
import { setControlPanelVisibility } from 'app/redux/actions/drone';

/**
 * Container for managing the map and control panel views.
 */
class OverviewContainer extends Component {
  static propTypes = {
    selectedDrone: PropTypes.string,
    isControlPanelVisible: PropTypes.bool.isRequired,
    expandControlPanel: PropTypes.func.isRequired,
    collapseControlPanel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedDrone: null,
  };

  state = { isExpandHover: false };

  setExpandHover = (isExpandHover) => () => this.setState({ isExpandHover });

  handleExpandClick = () => {
    this.props.expandControlPanel();
    this.setState({ isExpandHover: false });
  };

  render() {
    const {
      selectedDrone,
      isControlPanelVisible,
      collapseControlPanel,
    } = this.props;
    const { isExpandHover } = this.state;

    const isFullView = !selectedDrone || !isControlPanelVisible;

    return (
      <div>
        <Helmet>
          <title>Skycontrol</title>
        </Helmet>

        <div style={{ display: 'flex' }}>
          <DroneMapContainer
            selectedDrone={selectedDrone}
            isFullView={isFullView}
          />

          {!isFullView && (
            <ControlPanelContainer
              droneIP={selectedDrone}
              collapse={collapseControlPanel}
            />
          )}
        </div>

        {selectedDrone && !isControlPanelVisible && (
          <div
            onMouseEnter={this.setExpandHover(true)}
            onMouseLeave={this.setExpandHover(false)}
            onClick={this.handleExpandClick}
            style={{
              backgroundColor: 'white',
              cursor: 'pointer',
              marginTop: '30px',
              padding: '10px',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <KeyboardArrowLeft
              style={{
                transition: 'all 0.15s ease',
                marginRight: isExpandHover ? '10px' : 0,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ drone }) => ({
  selectedDrone: drone.selectedDrone,
  isControlPanelVisible: drone.isControlPanelVisible,
});

const mapDispatchToProps = (dispatch) => ({
  expandControlPanel: () => dispatch(setControlPanelVisibility(true)),
  collapseControlPanel: () => dispatch(setControlPanelVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
