import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Link } from '@app/components';
import { BellOutlineIcon } from '@app/components/Icons';

const PostCard = ({ children, small }) => (
  <div
    className={` transform transition-all flex items-start bg-neutral-50 hover:scale-105 hover:bg-neutral-100 p-4 ${
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

PostCard.Content = ({ title, children, small }) => (
  <div className="w-full pl-2">
    <h2
      className={`text-neutral-600 ${
        small
          ? 'text-sm leading-5 font-semibold'
          : 'text-sm font-bold text-neutral-800 leading-6'
      }`}
    >
      <Link href="/" variant="secondary">
        {title}
      </Link>
    </h2>
    {children}
  </div>
);

PostCard.Content.defaultProps = {
  children: null,
  small: false,
};
PostCard.Content.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

PostCard.Footer = ({ publisher, small }) => (
  <div className="flex items-center justify-items-start w-full mt-3 bg-neutral-100">
    <span className={`${small ? 'text-xs' : 'text-sm'} text-neutral-500`}>
      From:
    </span>
    &nbsp;
    <Link
      href={publisher.url}
      className={`font-bold ${small ? 'text-xs' : 'text-sm'}`}
    >
      {publisher.name}
    </Link>
    &nbsp;&nbsp;&nbsp;
    <span className="rounded-full inline-block h-2 w-2 bg-neutral-300" />
    &nbsp;&nbsp;&nbsp;
    <span className={` ${small ? 'text-xs' : 'text-sm'} text-neutral-500}`}>
      Available:
    </span>
    &nbsp;
    <Link
      href={`/available/${publisher.activeDate}`}
      className={`${small ? 'text-xs' : 'text-sm'} font-bold`}
    >
      {publisher.activeDate}
    </Link>
    <button type="button" className="ml-auto" title="Get notified">
      <BellOutlineIcon
        size={small ? 'xs' : 'sm'}
        className="text-primary-700"
      />
    </button>
  </div>
);

PostCard.Footer.defaultProps = {
  small: false,
};

PostCard.Footer.propTypes = {
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
  small: PropTypes.bool,
};

export default PostCard;
