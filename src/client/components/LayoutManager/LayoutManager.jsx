import React from 'react';
import PropTypes from 'prop-types';
import AuthModalContainer from '@app/containers/AuthModalContainer';
import NotificationContainer from '@app/containers/NotificationContainer';
import CommentsSidebarContainer from '@app/containers/CommentsSidebarContainer';

const LayoutManager = ({ children }) => (
  <>
    <NotificationContainer />
    <div className="bg-neutral-50 min-h-screen">{children}</div>
    <AuthModalContainer />
    <CommentsSidebarContainer />
  </>
);

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
