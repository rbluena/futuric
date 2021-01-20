import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from '@app/components';
import { BadgeIcon } from '@app/components/Icons';

const Header = ({ link, owner }) => {
  const url = link.isActive ? link.longUrl : `/links/${link._id}`;

  return (
    <div className="header flex flex-col md:flex-row border-b pb-2 border-neutral-200">
      <div className="relative pb-12">
        <Link
          href={url || ''}
          variant="primary"
          className="text-xl md:text-2xl font-light"
        >
          {link.shortenUrl}
        </Link>
        <br />
        <div className="relative">
          <div
            className="absolute text-sm top-0 bg-success-500 text-white font-bold shadow-2xl my-4 py-1 pl-2 pr-4"
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
        </div>
        {/* <div className="text-neutral-600 text-sm">
        <span className="font-bold text-neutral-800">Created At:</span>{' '}
        {link.createdAt && format(new Date(link.createdAt), 'MMM d')}
      </div> */}
      </div>

      <div className="hidden md:block md:ml-auto">
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
};
Header.defaultProps = {
  link: {},
  owner: {},
};

Header.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
  owner: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
