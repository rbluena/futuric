import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@app/components';

const Submit = ({ size, kind, children, ...rest }) => (
  <Button type="submit" kind={kind} size={size} {...rest}>
    {children}
  </Button>
);
Submit.defaultProps = {
  kind: '',
  size: 'md',
};

Submit.propTypes = {
  kind: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Submit;
