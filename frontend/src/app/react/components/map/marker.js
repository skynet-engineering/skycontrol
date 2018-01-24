import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pulsator, Spacing, Text } from 'react-elemental';

export default class Marker extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    info: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
  };

  state = { isHover: false };

  handleHoverStateChange = (isHover) => () => this.setState({ isHover });

  render() {
    const { color, info, expanded } = this.props;
    const { isHover } = this.state;

    const displayedInfo = info.filter(({ persistent }) => isHover || persistent || expanded);

    return (
      <div
        onMouseEnter={this.handleHoverStateChange(true)}
        onMouseLeave={this.handleHoverStateChange(false)}
      >
        <Pulsator color={color} size="gamma" transparent />

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'inline-block',
            left: '20px',
            position: 'relative',
          }}
        >
          <Spacing size="small" top right bottom left padding>
            {displayedInfo.map(({ key, value }, idx) => (
              <Spacing key={key} size="small" bottom={idx !== displayedInfo.length - 1}>
                <Spacing size="tiny" bottom>
                  <Text color="primary" size="lambda" secondary uppercase bold>
                    {key}
                  </Text>
                </Spacing>
                <Text color="gray20" size="kilo">
                  {value}
                </Text>
              </Spacing>
            ))}
          </Spacing>
        </div>
      </div>
    );
  }
}
