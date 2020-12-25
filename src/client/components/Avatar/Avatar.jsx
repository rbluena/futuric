import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ size, className, src, alt, initials }) => {
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

  if (!src || src.length === 0) {
    return (
      <div
        className={`rounded-full border-2 border-primary-700 bg-primary-500 text-white flex justify-center items-center font-semibold ${className}`}
      >
        {initials}
      </div>
    );
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
  initials: '',
  src: '',
};

Avatar.propTypes = {
  /** Size of an avatar. */
  size: PropTypes.string,

  /** Class names to be used. */
  className: PropTypes.string,

  /** Altenative text. */
  alt: PropTypes.string.isRequired,

  /** Source of the image */
  src: PropTypes.string,

  /** Initials that can be used if no avatar created. */
  initials: PropTypes.string,
};

export default Avatar;
