import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Spacing, Spinner, Text } from 'react-elemental';
import Skycontrol from 'app/react/components/logo/skycontrol';
import { MAP_TYPE_SIMPLE } from 'app/redux/reducers/options';

/**
 * Header displaying title, current status, and global options.
 */
const Header = ({
  droneIP,
  expandMarkers,
  contractMarkers,
  setSimpleMap,
  setSatelliteMap,
  options: { expandedVisibility, mapType },
}) => {
  const optionControls = [
    {
      text: expandedVisibility ? 'Less detail' : 'More detail',
      onClick: expandedVisibility ? contractMarkers : expandMarkers,
    },
    {
      text: mapType === MAP_TYPE_SIMPLE ? 'Satellite view' : 'Simple view',
      onClick: mapType === MAP_TYPE_SIMPLE ? setSatelliteMap : setSimpleMap,
    },
  ];

  return (
    <div style={{ position: 'absolute', zIndex: 2 }}>
      <Spacing top left>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
          <Spacing size="large" left right padding>
            <Spacing top bottom padding>
              <Spacing size="tiny" bottom>
                <Skycontrol />
              </Spacing>

              <Spacing bottom>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <Spacing size="small" right>
                    <Spinner color={droneIP ? colors.green : colors.red} size="gamma" transparent />
                  </Spacing>
                  <Text color={colors.gray30} inline>
                    {droneIP ? `Connected: ${droneIP}` : 'No drone selected'}
                  </Text>
                </div>
              </Spacing>

              {optionControls.map(({ text, onClick }) => (
                <Spacing key={text} size="small" right inline>
                  <Button text={text} onClick={onClick} size="gamma" />
                </Spacing>
              ))}
            </Spacing>
          </Spacing>
        </div>
      </Spacing>
    </div>
  );
};

Header.propTypes = {
  droneIP: PropTypes.string,
  expandMarkers: PropTypes.func.isRequired,
  contractMarkers: PropTypes.func.isRequired,
  setSimpleMap: PropTypes.func.isRequired,
  setSatelliteMap: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

Header.defaultProps = {
  droneIP: null,
};

export default Header;
