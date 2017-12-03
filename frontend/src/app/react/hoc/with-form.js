import React, { Component } from 'react';

/**
 * HOC for managing setting and retrieving state from form field inputs.
 *
 * @param {Component} WrappedComponent Compnent to wrap.
 */
const withForm = (WrappedComponent) =>
  class WithFormHOC extends Component {
    state = {};

    handleChange = (key) => (evt) => this.setState({
      [key]: evt.target ? evt.target.value : evt,
    });

    render() {
      const props = {
        ...this.props,
        form: this.state,
        handleChange: this.handleChange,
      };

      return (
        <WrappedComponent {...props} />
      );
    }
  };

export default withForm;
