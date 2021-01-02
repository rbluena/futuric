import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@app/components';

const Footer = ({ link }) => (
  <div className="flex items-center">
    <Link href="/" size="xs" className="italic">
      <span className="mr-1">35</span>Comments
    </Link>

    {link.isUserOwner && (
      <>
        <span className="ml-2 text-neutral-300">|</span>
        <div className="flex items-center">
          <Link href="/links/787388/analytics" size="xs" className="ml-2">
            Analytics
          </Link>
          <span className="ml-2 text-neutral-300">-</span>
          <Link href="/links/787388/edit" size="xs" className="ml-2">
            Activate
          </Link>
          <span className="ml-2 text-neutral-300">-</span>
          <Link href={`/links/${link._id}/edit`} size="xs" className="ml-2">
            Edit
          </Link>
          {/* <PencilIcon size="xs" className="ml-1" /> */}
          <span className="ml-2 text-neutral-300">-</span>
          <Link href="/" size="xs" className="ml-2">
            Delete
          </Link>
        </div>
      </>
    )}
  </div>
);

Footer.defaultProps = {
  link: {},
};

Footer.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
};

export default Footer;
