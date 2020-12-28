import React from 'react';
import PropTypes from 'prop-types';
import AuthModalContainer from '@app/containers/AuthModalContainer';

const LayoutManager = ({ children }) => (
  <>
    <div className="bg-neutral-50 min-h-screen">{children}</div>
    <AuthModalContainer />
  </>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
