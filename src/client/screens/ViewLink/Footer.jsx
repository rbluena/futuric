import millify from 'millify';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, Button } from '@app/components';
import { deleteLinkAction, loadLinkCommentsAction } from '@app/actions';

const Footer = ({ post }) => {
  const dispatch = useDispatch();

  /**
   * Retrieving comments for the post/link.
   */
  function loadComments() {
    dispatch(loadLinkCommentsAction({ linkId: post._id }));
  }

  return (
    <div className="flex items-center">
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
            <Link href="/links/787388/analytics" size="sm" className="ml-2">
              Stats
            </Link>
            <span className="ml-2 text-neutral-300">-</span>
            <Button
              variant="text-button"
              size="xs"
              className="ml-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
            >
              Activate
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
