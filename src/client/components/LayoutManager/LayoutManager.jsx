import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useUserSettingsRedirect } from '@app/hooks';
import AuthModalContainer from '@app/containers/AuthModalContainer';
import StatsModalContainer from '@app/containers/StatsModalContainer';
import NotificationContainer from '@app/containers/NotificationContainer';
import CommentsSidebarContainer from '@app/containers/CommentsSidebarContainer';
import ModalCropperContainer from '@app/containers/ModalCropperContainer';

const LayoutManager = ({ children }) => {
  const { redirectToSettings } = useUserSettingsRedirect();
  const router = useRouter();

  if (redirectToSettings) {
    return null;
  }

  return (
    <>
      <NotificationContainer />
      <div className="bg-neutral-50 min-h-screen">{children}</div>
      <AuthModalContainer />
      {router.pathname === '/settings' && <ModalCropperContainer />}
      {router.pathname === '/links/[id]' && <CommentsSidebarContainer />}
      {router.pathname === '/links/[id]' && <StatsModalContainer />}
    </>
  );
};

LayoutManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutManager;
