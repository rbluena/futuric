import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Link } from '@app/components';
import { BellOutlineIcon } from '@app/components/Icons';

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
    <Avatar src={publisher.image} initials={publisher.brandname[0]} />
    <div className="flex pl-2">
      <span className={`${small ? 'text-xs' : 'text-sm'} text-neutral-500`}>
        From
      </span>
      &nbsp;
      <Link
        href={publisher.profile}
        className={`font-bold ${small ? 'text-xs' : 'text-sm'}`}
      >
        {publisher.brandname}
      </Link>
    </div>
  </div>
);

PostCard.Header.defaultProps = {
  small: false,
};

PostCard.Header.propTypes = {
  small: PropTypes.bool,
  publisher: PropTypes.objectOf(PropTypes).isRequired,
};

PostCard.Avatar = ({ src, small }) => (
  <Avatar src={src} alt="brand image" size={`${small ? 'md' : 'lg'}`} />
);

PostCard.Avatar.defaultProps = {
  small: false,
};

PostCard.Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

PostCard.Content = ({ post, small }) => (
  <div className="w-full pl-10">
    <h2
      className={`text-neutral-600 ${
        small
          ? 'text-sm leading-4 font-semibold'
          : 'text-sm font-bold text-neutral-800 leading-4'
      }`}
    >
      <Link href={post.postUrl} variant="secondary">
        {post.title}
      </Link>
    </h2>

    <div className="flex items-center justify-items-start mt-2">
      <span className="text-xs text-neutral-600">{post.availableAt}</span>
      &nbsp;&nbsp;
      <span className="rounded-full inline-block h-2 w-2 bg-neutral-300" />
      &nbsp;&nbsp;
      {/* start: shorten url */}
      {post.isActive ? (
        <Link href={post.longUrl} className="text-xs">
          {post.shortenUrl}
        </Link>
      ) : (
        <span className="text-xs text-neutral-600">{post.shortenUrl}</span>
      )}
      {/* end: shorten url */}
      {/* start: Notification button. */}
      <button type="button" className="ml-auto p-3" title="Get notified">
        <BellOutlineIcon size="xs" className="text-primary-700" />
      </button>
      {/* end: Notification button. */}
    </div>
  </div>
);

PostCard.Content.propTypes = {
  title: PropTypes.string.isRequired,
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  small: PropTypes.bool.isRequired,
};

export default PostCard;
