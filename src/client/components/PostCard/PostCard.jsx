/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { getUserSelector } from '@app/selectors';
import { Avatar, Link } from '@app/components';
import { BellIcon, BellOutlineIcon, BadgeIcon } from '@app/components/Icons';
import { format } from 'date-fns';

const PostCard = ({ children, small }) => (
  <div
    className={` transform transition-all mb-2 items-start bg-neutral-50 hover:scale-105 hover:bg-neutral-100  hover:shadow-md mx-2 p-2 ${
      small ? 'max-w-sm' : ' max-w-xl'
    }`}
  >
    {children}
  </div>
);

PostCard.defaultProps = {
  small: false,
};

PostCard.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
};

PostCard.Header = ({ publisher, small }) => (
  <div className="flex w-full items-center">
    <Avatar
      src={publisher.image && publisher.image.thumbnail}
      initials={publisher.brandname[0]}
      alt={publisher.brandname}
    />
    <div className="flex pl-2">
      <span className={`${small ? 'text-xs' : 'text-sm'} text-neutral-500`}>
        From
      </span>
      &nbsp;
      <Link
        href={`/@${publisher.username}`}
        className={`font-bold flex ${small ? 'text-xs' : 'text-sm'}`}
      >
        {publisher.brandname}&nbsp;
        {publisher.prominent && (
          <BadgeIcon size="xs" className="text-success-700" />
        )}
      </Link>
    </div>
  </div>
);

PostCard.Header.defaultProps = {
  small: false,
};

PostCard.Header.propTypes = {
  small: PropTypes.bool,
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
};

PostCard.Content = ({ post, small, toggleWaiting }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  let isAuthUserOwner = false;

  if (user) {
    isAuthUserOwner = user._id === post.owner._id;
  }

  function toggleNotification() {
    if (user) {
      const type = post.isUserWaiting ? 'remove' : 'add';
      toggleWaiting(post._id, type);
    } else {
      dispatch(openModal('signin'));
    }
  }

  return (
    <div className="w-full pl-10">
      <h2
        className={`text-neutral-600 ${
          small
            ? 'leading-4 font-semibold'
            : 'font-bold text-neutral-800 leading-4'
        }`}
      >
        <Link href={post.longUrl} variant="secondary">
          {post.title}
        </Link>
      </h2>

      <div className="flex items-center justify-items-start mt-2">
        {/* start: shorten url */}
        {post.isActive ? (
          <Link href={post.longUrl} className="text-xs">
            {post.shortenUrl}
          </Link>
        ) : (
          <Link href={post.longUrl} variant="secondary" className="text-xs">
            {post.shortenUrl}
          </Link>
        )}
        {/* end: shorten url */}
        &nbsp;&nbsp;
        <span className="rounded-full inline-block h-2 w-2 bg-neutral-300" />
        &nbsp;&nbsp;
        <span className="text-xs text-neutral-600">
          {format(new Date(post.availableDate), 'MMM d')}
        </span>
        {/* start: Notification button. */}
        {!isAuthUserOwner && (
          <button
            type="button"
            className="ml-auto p-1 rounded-sm hover:bg-primary-400 text-primary-700 hover:text-white"
            title="Get notified"
            onClick={toggleNotification}
          >
            {post.isUserWaiting ? (
              <BellIcon size="sm" />
            ) : (
              <BellOutlineIcon size="sm" />
            )}
          </button>
        )}
        {/* end: Notification button. */}
      </div>
    </div>
  );
};

PostCard.Content.defaultProps = {
  small: false,
};

PostCard.Content.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  toggleWaiting: PropTypes.func.isRequired,
  small: PropTypes.bool,
};

export default PostCard;
