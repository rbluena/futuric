import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ size, className, src, alt }) => {
  if (size === 'sm') {
    className += ' h-6 w-6';
  }

  if (size === 'md') {
    className += ' h-8 w-8';
  }

  if (size === 'lg') {
    className += ' h-10 w-10';
  }

  if (size === 'xl') {
    className += ' h-14 w-14';
  }

  return (
    <img
      className={`rounded-full border-2 border-primary-700 ${className}`}
      src={src}
      alt={alt}
    />
  );
};

Avatar.defaultProps = {
  size: 'md',
  className: '',
};

Avatar.propTypes = {
  /** Size of an avatar. */
  size: PropTypes.string,

  /** Class names to be used. */
  className: PropTypes.string,

  /** Altenative text. */
  alt: PropTypes.string.isRequired,

  /** Source of the image */
  src: PropTypes.string.isRequired,
};

export default Avatar;
