import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import AuthModalContainer from '@app/containers/AuthModalContainer';
import StatsModalContainer from '@app/containers/StatsModalContainer';
import NotificationContainer from '@app/containers/NotificationContainer';
import CommentsSidebarContainer from '@app/containers/CommentsSidebarContainer';

const LayoutManager = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <NotificationContainer />
      <div className="bg-neutral-50 min-h-screen">{children}</div>
      <AuthModalContainer />
      {router.pathname === '/links/[id]' && <CommentsSidebarContainer />}
      {router.pathname === '/links/[id]' && <StatsModalContainer />}
    </>
  );
};

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
