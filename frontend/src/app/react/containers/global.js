import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from 'app/react/containers/header';

const GlobalContainer = ({ children }) => (
  <div>
    <HeaderContainer />
    {children}
  </div>
);

GlobalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContainer;
