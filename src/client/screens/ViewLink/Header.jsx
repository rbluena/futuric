import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, Button } from '@app/components';
import {
  BellOutlineIcon,
  // LinkedinIcon,
  // TwitterIcon,
  // FacebookIcon,
  BadgeIcon,
} from '@app/components/Icons';

const Header = ({ link, owner, isOwner }) => (
  <div className="header flex border-b border-neutral-200">
    <div className="">
      <Link
        href={link.longUrl || ''}
        variant={link.isActive ? 'primary' : 'secondary'}
      >
        {link.shortenUrl}
      </Link>

      <br />
      {link.availableDate && (
        <div className="text-neutral-600 text-sm">
          <span className="font-bold text-neutral-800">Available At:</span>{' '}
          {link.isActive
            ? 'Published'
            : link.availableDate &&
              format(new Date(link.availableDate), 'MMM d')}
        </div>
      )}

      <div className="border-neutral-200 pt-2 flex items-center">
        <Button
          variant="text-button"
          size=""
          className="mr-2"
          title="Get notified."
        >
          <BellOutlineIcon size="xs" className="text-primary-700" />
        </Button>
        <span className="text-neutral-500 mr-2">|</span>
        {/* <Button variant="text-button" size="" className="mr-2">
          <TwitterIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <LinkedinIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <FacebookIcon size="xs" className="text-primary-700" />
        </Button> */}
      </div>
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
          {!isOwner && (
            <Link href="/@" size="xs">
              {/* Follow */}
              Unfollow
            </Link>
          )}
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
  isOwner: PropTypes.bool.isRequired,
  owner: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
