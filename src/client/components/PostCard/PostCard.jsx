import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Link } from '@app/components';
import { BellOutlineIcon } from '@app/components/Icons';

const PostCard = ({ children }) => (
  <div className="flex items-start max-w-xl bg-neutral-50 p-4">{children}</div>
);

PostCard.propTypes = {
  children: PropTypes.node.isRequired,
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

PostCard.Content = ({ title, children }) => (
  <div className="w-full pl-2">
    <h2 className="font-semibold text-lg leading-6 text-neutral-700">
      {title}
    </h2>
    {children}
  </div>
);

PostCard.Content.defaultProps = {
  children: null,
};
PostCard.Content.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

PostCard.Footer = ({ publisher }) => (
  <div className="flex items-center justify-items-start w-full mt-3">
    <span className="text-sm text-neutral-500">From:</span>
    &nbsp;
    <Link href={publisher.url} className="font-bold text-sm">
      {publisher.name}
    </Link>
    &nbsp;&nbsp;&nbsp;
    <span className="rounded-full inline-block h-2 w-2 bg-neutral-300" />
    &nbsp;&nbsp;&nbsp;
    <span className="text-sm text-neutral-500">Available:</span>
    &nbsp;
    <Link
      href={`/available/${publisher.activeDate}`}
      className="text-sm font-bold"
    >
      {publisher.activeDate}
    </Link>
    <button type="button" className="ml-auto" title="Get notified">
      <BellOutlineIcon size="sm" className="text-neutral-500" />
    </button>
  </div>
);

PostCard.Footer.propTypes = {
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default PostCard;
