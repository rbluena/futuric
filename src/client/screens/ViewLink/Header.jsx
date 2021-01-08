import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, Button } from '@app/components';
import {
  BellOutlineIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  BadgeIcon,
} from '@app/components/Icons';

const Header = ({ post, owner }) => (
  <div className="header flex border-b border-neutral-200">
    <div className="">
      <Link
        href={post.longUrl || ''}
        variant={post.isActive ? 'primary' : 'secondary'}
      >
        {post.shortenUrl}
      </Link>

      <br />
      {post.availableDate && (
        <div className="text-neutral-600 text-sm">
          <span className="font-bold text-neutral-800">Available At:</span>{' '}
          {post.isActive
            ? 'Published'
            : post.availableDate &&
              format(new Date(post.availableDate), 'MMM d')}
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
        <Button variant="text-button" size="" className="mr-2">
          <TwitterIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <LinkedinIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <FacebookIcon size="xs" className="text-primary-700" />
        </Button>
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
          {/* {!post.isUserOwner && (
            <Button
              variant="text-button"
              size="sm"
              className="text-sm hover:underline text-primary-700"
            >
              {owner.isUserFollowingAuthor ? 'Unfollow' : 'Follow'}
            </Button>
          )} */}
        </div>
        {/* <Avatar initials="NL" size="xl" className="text-2xl" /> */}
      </div>
    </div>
  </div>
);

Header.defaultProps = {
  post: {},
  owner: {},
};

Header.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape),
  owner: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
