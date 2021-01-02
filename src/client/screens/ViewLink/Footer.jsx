import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, Button } from '@app/components';
import { deleteLinkAction } from '@app/actions';

const Footer = ({ link }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <Link href="/" size="sm" className="italic">
        <span className="mr-1">{link.commentCounts || 0}</span>Comments
      </Link>

      {link.isUserOwner && (
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
            <Link href={`/links/${link._id}/edit`} size="sm" className="ml-2">
              Edit
            </Link>
            {/* <PencilIcon size="xs" className="ml-1" /> */}
            <span className="ml-2 text-neutral-300">-</span>
            <Button
              variant="text-button"
              size="xs"
              className="ml-2 text-sm text-primary-700 hover:text-primary-900 hover:underline"
              onClick={() => dispatch(deleteLinkAction(link._id, true))}
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
  link: {},
};

Footer.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
};

export default Footer;
