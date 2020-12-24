import React from 'react';
import PropTypes from 'prop-types';

const LayoutManager = ({ children }) => (
  <div className="bg-neutral-50 min-h-screen">{children}</div>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
