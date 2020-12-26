import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <div className="mx-auto max-w-5xl">{children}</div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
