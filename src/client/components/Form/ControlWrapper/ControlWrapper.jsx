import React from 'react';
import PropTypes from 'prop-types';

const ControlWrapper = ({ children }) => <div className="my-4">{children}</div>;

ControlWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ControlWrapper;
