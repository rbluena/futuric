import React from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = ({ children }) => (
  <div className="mx-auto max-w-5xl">{children}</div>
);

ContentWrapper.defaultProps = {
  children: null,
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default ContentWrapper;
