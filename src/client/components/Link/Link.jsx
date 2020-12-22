import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'next/link';

const Link = ({ children, size, href, className, active, ...props }) => {
  if (size === 'xs') {
    className += ' text-xs';
  }

  if (size === 'sm') {
    className += ' text-sm';
  }

  if (size === 'md') {
    className += ' text-md';
  }

  if (size === 'lg') {
    className += ' text-lg';
  }

  return (
    <LinkWrapper prefetch={false} href={href} {...props}>
      <a
        className={`text-pink-700 hover:text-pink-900 transition duration-150 ease-in-out ${className}`}
        href={href}
      >
        {children}
      </a>
    </LinkWrapper>
  );
};

Link.defaultProps = {
  active: false,
  className: '',
  size: 'md',
};

Link.propTypes = {
  /** Children content. */
  children: PropTypes.node.isRequired,

  /** Relative or absolute URL. */
  href: PropTypes.string.isRequired,

  /** Extended class names. */
  className: PropTypes.string,

  /**  */
  active: PropTypes.bool,
  size: PropTypes.string,
};

export default Link;
