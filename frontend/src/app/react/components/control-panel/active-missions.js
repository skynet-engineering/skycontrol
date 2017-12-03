import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Spacing, Text } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

/**
 * Represents a link to a single mission's control interface.
 */
class MissionLink extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = { isHover: false };

  handleHoverStateChange = (isHover) => () => this.setState({ isHover });

  render() {
    const { text, onClick } = this.props;
    const { isHover } = this.state;

    const arrowStyle = {
      marginLeft: isHover ? '10px' : '6px',
      transition: 'all 0.15s ease',
    };

    return (
      <Spacing size="small" bottom>
        <Link
          onMouseEnter={this.handleHoverStateChange(true)}
          onMouseLeave={this.handleHoverStateChange(false)}
          onClick={onClick}
          plain
        >
          {text}
          <span style={arrowStyle}>
            <KeyboardArrowRight />
          </span>
        </Link>
      </Spacing>
    );
  }
}

/**
 * Listing of all currently active missions on the drone.
 */
const ActiveMissions = ({ missions, controlMission }) => (
  <div>
    <Spacing bottom>
      <Text size="beta">
        Active missions
      </Text>
    </Spacing>

    {missions.map(({ mission_id: missionID }) => (
      <MissionLink
        key={missionID}
        text={missionID}
        onClick={() => controlMission(missionID)}
      />
    ))}
  </div>
);

ActiveMissions.propTypes = {
  missions: PropTypes.arrayOf(PropTypes.shape({
    mission_id: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
  })).isRequired,
  controlMission: PropTypes.func.isRequired,
};

export default ActiveMissions;
