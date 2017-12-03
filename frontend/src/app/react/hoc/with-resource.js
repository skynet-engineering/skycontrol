import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import { startProgress, endProgress } from 'app/redux/actions/progress';
import resource from 'app/util/resource';

/**
 * HOC for invoking a resource and supplying its response data to the wrapped component as a prop.
 *
 * @param {Object} opts
 */
const withResource = (opts) => (WrappedComponent) => {
  class WithResourceHOC extends Component {
    static propTypes = {
      resourceStart: PropTypes.func.isRequired,
      resourceEnd: PropTypes.func.isRequired,
    };

    state = {
      err: null,
      isLoaded: false,
      data: undefined,
    };

    componentDidMount() {
      this.invokeResource();
    }

    componentDidUpdate(prevProps) {
      const { data = () => ({}) } = opts;

      // Invoke the resource again if the params or data have changed (e.g., via a change in props
      // passed to the wrapper HOC)
      if (!deepEqual(data(this.props), data(prevProps))) {
        this.retry();
      }
    }

    onComplete = (err, data) => {
      this.props.resourceEnd();
      this.setState({
        err,
        data,
        isLoaded: true,
      });
    };

    retry = () => {
      this.setState({
        err: null,
        isLoaded: false,
        data: undefined,
      });

      this.invokeResource();
    };

    invokeResource = () => {
      const {
        endpoint,
        data = () => ({}),
        method = 'GET',
      } = opts;

      this.props.resourceStart();

      resource({
        endpoint,
        method,
        data: data(this.props),
      }, this.onComplete);
    };

    render() {
      const { err, isLoaded, data } = this.state;
      const { key = 'resource' } = opts;

      const props = {
        ...this.props,
        [key]: {
          err,
          isLoaded,
          data,
          retry: this.retry,
        },
      };

      return (
        <WrappedComponent {...props} />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    resourceStart: () => dispatch(startProgress()),
    resourceEnd: () => dispatch(endProgress()),
  });

  return connect(null, mapDispatchToProps)(WithResourceHOC);
};


export default withResource;
