import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from '@app/components';
import { BadgeIcon } from '@app/components/Icons';

const Header = ({ link, owner }) => (
  <div className="header flex border-b pb-2 border-neutral-200">
    <div className="">
      <Link
        href={link.longUrl || ''}
        variant={link.isActive ? 'primary' : 'secondary'}
      >
        {link.shortenUrl}
      </Link>
      <br />
      <div className="text-neutral-600 text-sm">
        <span className="font-bold text-neutral-800">Created At:</span>{' '}
        {link.createdAt && format(new Date(link.createdAt), 'MMM d')}
      </div>
      {link.availableDate && (
        <div className="text-neutral-600 text-sm">
          <span className="font-bold text-neutral-800">Available At:</span>{' '}
          {link.isActive
            ? 'Published'
            : link.availableDate &&
              format(new Date(link.availableDate), 'MMM d')}
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
            {owner.prominent && (
              <BadgeIcon size="xs" className="text-success-500" />
            )}
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
  owner: {},
};

Header.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
  owner: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
