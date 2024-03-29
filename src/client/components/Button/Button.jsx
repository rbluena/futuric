import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, outline, className, size, variant, ...rest }) => {
  if (variant === 'text-button') {
    className += ' p-0 m-0';
  } else {
    className += ' rounded-sm';
  }

  if (variant === 'primary' && !outline) {
    className += ' text-neutral-50 bg-primary-700 hover:bg-primary-800';
  }

  if (variant === 'primary' && outline) {
    className +=
      ' border border-primary-700 text-primary-500 hover:bg-primary-700 hover:text-white';
  }

  if (variant === 'secondary' && !outline) {
    className += ' bg-white text-primary-700';
  }

  if (variant === 'secondary' && outline) {
    className +=
      ' border border-neutral-50 text-neutral-50 hover:bg-neutral-200 hover:text-neutral-900';
  }

  if (size === 'sm') {
    className += ' p-2 text-sm font-semibold';
  }

  if (size === 'lg') {
    className += ' w-full py-3 px-6 text-lg font-bold';
  }

  if (size === 'md') {
    className += ' py-2 px-4 text-sm font-bold';
  }

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  outline: false,
  className: '',
};

Button.propTypes = {
  /** Children nodes */
  children: PropTypes.node.isRequired,

  /** Size of the button. */
  size: PropTypes.string,

  /** Either is primary, secondary or tertiary buttons. */
  variant: PropTypes.string,

  /** Outlined or non-outline button. */
  outline: PropTypes.bool,

  /** Extra class names to be used. */
  className: PropTypes.string,
};

export default Button;
