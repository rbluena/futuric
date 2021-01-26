import React from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = ({ children, className }) => (
  <div className={`mx-auto max-w-6xl px-2 md:px-0 ${className}`}>
    {children}
  </div>
);

ContentWrapper.defaultProps = {
  children: null,
  className: '',
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ContentWrapper;
