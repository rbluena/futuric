import React from 'react';
import { Button } from '@app/components';

const ViewMoreButton = ({ ...props }) => (
  <div className="max-w-xs mx-auto">
    <Button variant="primary" outline size="lg" {...props}>
      View More
    </Button>
  </div>
);

export default ViewMoreButton;
