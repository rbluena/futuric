import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from '@app/components';
import { BadgeIcon } from '@app/components/Icons';

const Header = ({ link }) => (
  <div className="header flex border-b pb-2 border-neutral-200">
    <div className="">
      {link.isActive ? (
        <Link href={link.shortenUrl} variant="primary">
          {link.shortenUrl}
        </Link>
      ) : (
        <span className="text-xl text-neutral-700">{link.shortenUrl}</span>
      )}
      <br />
      <div className="text-neutral-600 text-sm">
        <span className="font-bold text-neutral-800">Created At:</span>{' '}
        {format(link.createdAt, 'MMM D')}
      </div>
      {link.availableDate && (
        <div className="text-neutral-600 text-sm">
          <span className="font-bold text-neutral-800">Available At:</span>{' '}
          {format(link.availableDate, 'MMM D')}
        </div>
      )}
    </div>

    <div className="ml-auto">
      <div className="flex flex-wrap-reverse items-center">
        <div className="flex flex-col items-start pr-2">
          <Link
            href="/@netflix"
            variant="secondary"
            size="lg"
            className="font-bold flex items-center"
          >
            <span>Netflix</span>
            &nbsp;
            <BadgeIcon size="xs" className="text-success-700" />
          </Link>
          {/* <Link href="/@" size="xs">
            Follow
          </Link> */}
        </div>
        {/* <Avatar initials="NL" size="xl" className="text-2xl" /> */}
      </div>
    </div>
  </div>
);

Header.defaultProps = {
  link: {},
};

Header.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
