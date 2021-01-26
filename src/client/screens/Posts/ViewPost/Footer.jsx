import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import millify from 'millify';
import { openModal } from '@app/slices/globalSlice';
import { Link, Button } from '@app/components';
import { MODALS } from '@app/constants';
import { deleteLinkAction, loadLinkCommentsAction } from '@app/actions';

const Footer = ({ post }) => {
  const dispatch = useDispatch();

  /**
   * Retrieving comments for the post/link.
   */
  function loadComments() {
    dispatch(loadLinkCommentsAction({ linkId: post._id }));
  }

  function openStatsModal() {
    dispatch(openModal(MODALS.linkStats));
  }

  function openActivateModal() {
    dispatch(openModal(MODALS.linkActivate));
  }

  return (
    <div className="flex items-center mt-8 border-t border-neutral-200 p-2 md:p-4">
      <Button
        variant="text-button"
        size="xs"
        className="mr-1 text-sm text-primary-700 hover:text-primary-900 hover:underline italic"
        onClick={loadComments}
      >
        &nbsp;
        {millify(post.commentsCount)} Comments
      </Button>

      {post.isUserOwner && (
        <>
          <span className="ml-2 text-neutral-300">|</span>
          <div className="flex items-center">
            <Button
              variant="text-button"
              size="xs"
              className="ml-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
              onClick={openStatsModal}
            >
              Stats
            </Button>
            <span className="ml-2 text-neutral-300">-</span>
            <Button
              variant="text-button"
              size="xs"
              className="ml-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
              onClick={openActivateModal}
            >
              Activation
            </Button>
            <span className="ml-2 text-neutral-300">-</span>
            <Link href={`/links/${post._id}/edit`} size="sm" className="ml-2">
              Edit
            </Link>
            {/* <PencilIcon size="xs" className="ml-1" /> */}
            <span className="ml-2 text-neutral-300">-</span>
            <Button
              variant="text-button"
              size="xs"
              className="ml-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
              onClick={() => dispatch(deleteLinkAction(post._id, true))}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

Footer.defaultProps = {
  post: {},
};

Footer.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape),
};

export default Footer;
