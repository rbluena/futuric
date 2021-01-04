import React from 'react';
import { Button } from '@app/components';

const ViewAllButton = ({ ...props }) => (
  <Button variant="primary" outline size="lg" {...props}>
    View All
  </Button>
);

export default ViewAllButton;
