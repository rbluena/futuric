import React from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from 'react-use';
import { format } from 'date-fns';
import { Link, Button } from '@app/components';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share';
import {
  BellIcon,
  BellOutlineIcon,
  ClipboardListIcon,
  // LinkedinIcon,
  // TwitterIcon,
  // FacebookIcon,
  BadgeIcon,
} from '@app/components/Icons';

const Header = ({ post, owner, toggleWaiting }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const url = post.isActive ? post.longUrl : `/links/${post._id}`;
  const isCurrentUserOwner = post.isUserOwner;

  function copyTextToClipboard() {
    copyToClipboard(post.shortenUrl);
    // eslint-disable-next-line no-alert
    window.alert('Copied to the clipboard!');
  }

  return (
    <div className="header flex border-b border-neutral-200">
      <div className="relative">
        <div className="flex items-center">
          <Link
            href={url || ''}
            // variant={post.isActive ? 'primary' : 'secondary'}
            variant="primary"
            className="sm:text-lg md:text-2xl font-light"
          >
            {post.shortenUrl}
          </Link>

          <Button
            variant="text-button"
            className="text-neutral-400 p-0"
            title="Copy to clipboard"
            onClick={copyTextToClipboard}
          >
            <ClipboardListIcon size="sm" />
          </Button>
        </div>

        <br />
        <div
          className="absolute bg-primary-500 text-white left-0 top-12 font-bold shadow-2xl py-1 pl-2 pr-4"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0, 93% 54%, 87% 100%, 0% 100%)',
          }}
        >
          {/* eslint-disable-next-line no-nested-ternary  */}
          {post.isActive
            ? 'Available'
            : post.availableDate
            ? format(new Date(post.availableDate), 'MMM d')
            : 'Coming soon'}
        </div>

        <div className="border-neutral-200 py-2 pt-8 flex items-center">
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
          <TwitterShareButton title={post.title} url={post.shortenUrl}>
            <TwitterIcon size={28} />
          </TwitterShareButton>
          &nbsp;
          <FacebookShareButton title={post.title} url={post.shortenUrl}>
            <FacebookIcon size={28} />
          </FacebookShareButton>
          &nbsp;
          <LinkedinShareButton
            source={post.shortenUrl}
            url={post.shortenUrl}
            title={post.title}
          >
            <LinkedinIcon size={28} />
          </LinkedinShareButton>
          <div className="sharethis-inline-share-buttons" />
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
