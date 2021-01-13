import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from '@app/components';
import { BadgeIcon } from '@app/components/Icons';

const Header = ({ link, owner }) => (
  <div className="header flex border-b pb-2 border-neutral-200">
    <div className="relative pb-12">
      <Link
        href={link.longUrl || ''}
        variant={link.isActive ? 'primary' : 'secondary'}
        className="sm:text-xl md:text-2xl font-light"
      >
        {link.shortenUrl || ''}
      </Link>
      <br />
      <div
        className="absolute bg-primary-500 text-white left-0 top-12 font-bold shadow-2xl py-1 pl-2 pr-4"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0, 93% 54%, 87% 100%, 0% 100%)',
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary  */}
        {link.isActive
          ? 'Available'
          : link.availableDate
          ? format(new Date(link.availableDate), 'MMM d')
          : 'Coming soon'}
      </div>
      {/* <div className="text-neutral-600 text-sm">
        <span className="font-bold text-neutral-800">Created At:</span>{' '}
        {link.createdAt && format(new Date(link.createdAt), 'MMM d')}
      </div> */}
    </div>

    <div className="ml-auto">
      <div className="flex flex-wrap-reverse items-center">
        <div className="flex flex-col items-start pr-2">
          <Link
            href={`/@${owner.username}`}
            variant="secondary"
            size="lg"
            className="font-bold flex items-center"
          >
            <span>{owner.brandname}</span>
            &nbsp;
            {owner.prominent && (
              <BadgeIcon size="xs" className="text-success-500" />
            )}
          </Link>
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
