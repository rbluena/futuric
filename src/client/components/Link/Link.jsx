import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'next/link';

const Link = ({
  children,
  variant,
  size,
  href,
  className,
  active,
  ...props
}) => {
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
        className={`transition duration-150 ease-in-out ${className} ${
          variant === 'secondary'
            ? 'text-neutral-500 hover:text-neutral-900'
            : 'text-primary-700 hover:text-primary-900'
        }`}
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
  variant: '',
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

  /**  */
  size: PropTypes.string,

  /** Link can of variant primary or secondary. */
  variant: PropTypes.string,
};

export default Link;
