import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@app/components';

const Submit = ({ size, kind, wide, children, ...rest }) => (
  <Button type="submit" kind={kind} size={size} wide={wide} {...rest}>
    {children}
  </Button>
);
Submit.defaultProps = {
  wide: false,
  kind: '',
  size: 'md',
};

Submit.propTypes = {
  wide: PropTypes.bool,
  kind: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Submit;
