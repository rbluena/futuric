import React from 'react';
import PropTypes from 'prop-types';

const DotSeparator = ({ variant }) => {
  const className =
    variant === 'primary' ? '  bg-primary-500' : ' bg-neutral-400';

  return <span className={`rounded-full inline-block h-1 w-1 ${className}`} />;
};

DotSeparator.defaultProps = {
  variant: '',
};

DotSeparator.propTypes = {
  variant: PropTypes.string,
};

export default DotSeparator;
