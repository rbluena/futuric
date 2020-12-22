import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, outline, className, size, variant }) => {
  if (variant === 'primary' && !outline) {
    className += ' text-white bg-indigo-500 rounded-sm';
  }

  if (variant === 'primary' && outline) {
    className += ' border border-indigo-500 text-indigo-500 rounded-sm';
  }

  if (variant === 'secondary' && !outline) {
    className += ' bg-white text-indigo-500 rounded-sm';
  }

  if (variant === 'secondary' && outline) {
    className += ' border border-white text-white rounded-sm';
  }

  if (size === 'lg') {
    className += ' w-full py-3 px-6 text-lg';
  }

  if (size === 'md') {
    className += ' py-2 px-4 text-sm';
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'secondary',
  size: 'lg',
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
