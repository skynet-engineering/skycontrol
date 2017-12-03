import { connect } from 'react-redux';

/**
 * HOC to inject options pulled from the global Redux store.
 *
 * @param {Component} WrappedComponent Child component to wrap.
 */
const withOptions = (WrappedComponent) =>
  connect(({ options }) => ({ options }))(WrappedComponent);

export default withOptions;
