import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineHeart } from 'react-icons/hi';

function HeartOutlineIcon({ size, className }) {
  if (size === 'xs') className += ' w-4 h-4';
  if (size === 'sm') className += ' w-6 h-6';
  if (size === 'md') className += ' w-8 h-8';
  if (size === 'lg') className += ' w-12 h-12';

  return <HiOutlineHeart className={`${className}`} />;
}

HeartOutlineIcon.defaultProps = {
  size: 'md',
  className: '',
};

HeartOutlineIcon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default HeartOutlineIcon;
