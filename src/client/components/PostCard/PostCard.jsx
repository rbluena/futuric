/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { getUserSelector } from '@app/selectors';
import { Avatar, Link, DotSeparator } from '@app/components';
import { BellIcon, BellOutlineIcon, BadgeIcon } from '@app/components/Icons';
import { format } from 'date-fns';
import categories from '@app/utils/categories';

const PostCard = ({ children }) => (
  <div className="transform transition-all items-start bg-white hover:translate-x-1 hover:shadow-sm mx-auto p-4 py-6 max-w-xl">
    {children}
  </div>
);

PostCard.propTypes = {
  children: PropTypes.node.isRequired,
};

PostCard.Header = ({ publisher, small }) => (
  <div className="flex w-full items-center">
    <Avatar
      src={publisher.image && publisher.image.thumbnail}
      initials={publisher.brandname[0]}
      alt={publisher.brandname}
      square
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

// Start: POST CARD HEADER

PostCard.Header.defaultProps = {
  small: false,
};

PostCard.Header.propTypes = {
  small: PropTypes.bool,
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
};
// End: POST CARD HEADER

// Start: POST CARD CONTENT
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

  const category = categories.find((item) => item.code === post.category);

  return (
    <div className="w-full mt-4">
      <h2
        className={`text-lg ${
          small ? 'leading-6 font-semibold' : 'font-bold text-black leading-6'
        }`}
      >
        <Link
          href={`/links/${post._id}`}
          className="text-neutral-800 hover:text-neutral-900 hover:no-underline"
        >
          {post.title}
        </Link>
      </h2>
      {/* start: shorten url */}
      <div className="mt-2">
        {post.isActive ? (
          <Link href={post.longUrl} className="text-base">
            {post.shortenUrl}
          </Link>
        ) : (
          <Link href={post.longUrl} variant="secondary" className="text-base">
            {post.shortenUrl}
          </Link>
        )}
        {/* end: shorten url */}
      </div>

      {/* start: FOOTER OF POST CARD */}
      <div className="flex justify-start items-center mt-4">
        <div className="flex items-center">
          <span className="text-sm text-neutral-700">
            Available: &nbsp;
            {post.availableDate
              ? format(new Date(post.availableDate), 'MMM d')
              : 'Soon'}
          </span>
          &nbsp;&nbsp;
          {category && (
            <>
              <DotSeparator />
              &nbsp;&nbsp;
              <span className="text-sm text-neutral-600">{category.name}</span>
            </>
          )}
        </div>

        {/* start: Notification button. */}
        {!isAuthUserOwner && (
          <button
            type="button"
            className="ml-auto p-1 rounded-sm hover:bg-neutral-300 text-neutral-400 hover:text-white "
            title="Get notified"
            onClick={toggleNotification}
          >
            {post.isUserWaiting ? (
              <BellIcon size="sm" className="text-primary-600" />
            ) : (
              <BellOutlineIcon size="sm" />
            )}
          </button>
        )}
        {/* end: Notification button. */}
      </div>
      {/* end: FOOTER OF POST CARD */}
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
// End: POST CARD CONTENT

export default PostCard;
