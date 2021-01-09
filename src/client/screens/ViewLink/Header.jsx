import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, Button } from '@app/components';
import {
  BellIcon,
  BellOutlineIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  BadgeIcon,
} from '@app/components/Icons';

const Header = ({ post, owner, toggleWaiting }) => {
  const url = post.isActive ? post.longUrl : `/links/${post._id}`;
  const isCurrentUserOwner = post.isUserOwner;

  return (
    <div className="header flex border-b border-neutral-200">
      <div className="">
        <Link
          href={url || ''}
          variant={post.isActive ? 'primary' : 'secondary'}
          className="sm:text-lg md:text-2xl font-light"
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

        <div className="border-neutral-200 py-2 pt-4 flex items-center">
          {!isCurrentUserOwner && (
            <>
              <Button
                variant="text-button"
                size="sm"
                className="mr-2 text-primary-700 hover:text-primary-900"
                title="Get notified."
                onClick={toggleWaiting}
              >
                {post.isUserWaiting ? (
                  <BellIcon size="sm" />
                ) : (
                  <BellOutlineIcon size="sm" />
                )}
              </Button>
              <span className="text-neutral-500 mr-2">|</span>
            </>
          )}
          <Button variant="text-button" size="sm" className="mr-2">
            <TwitterIcon size="sm" className="text-primary-700" />
          </Button>
          <Button variant="text-button" size="sm" className="mr-2">
            <LinkedinIcon size="sm" className="text-primary-700" />
          </Button>
          <Button variant="text-button" size="sm" className="mr-2">
            <FacebookIcon size="sm" className="text-primary-700" />
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
};

Header.defaultProps = {
  post: {},
  owner: {},
};

Header.propTypes = {
  toggleWaiting: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.shape),
  owner: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
