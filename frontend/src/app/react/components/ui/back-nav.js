import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Text } from 'react-elemental';
import KeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';

/**
 * Link for back-navigation.
 */
export default class BackNav extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  state = { isHover: false };

  handleHoverStateChange = (isHover) => () => this.setState({ isHover });

  render() {
    const { onClick } = this.props;
    const { isHover } = this.state;

    const arrowStyle = {
      marginLeft: isHover ? '-7px' : '-2px',
      transition: 'all 0.15s ease',
    };

    return (
      <Text color="primary" inline>
        <Link
          type="plain"
          activeColor="black"
          onMouseEnter={this.handleHoverStateChange(true)}
          onMouseLeave={this.handleHoverStateChange(false)}
          onClick={onClick}
        >
          <div style={{ display: 'inline-block', width: '20px' }}>
            <Text color="inherit" inline>
              <span style={arrowStyle}>
                <KeyboardArrowLeft />
              </span>
            </Text>
          </div>
          <Text color="inherit" size="lambda" uppercase bold inline>
            Go back
          </Text>
        </Link>
      </Text>
    );
  }
}
