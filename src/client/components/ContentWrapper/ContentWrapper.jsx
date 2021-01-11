import React from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = ({ children }) => (
  <div className="mx-auto max-w-5xl px-2 md:px-0">{children}</div>
);

ContentWrapper.defaultProps = {
  children: null,
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default ContentWrapper;
