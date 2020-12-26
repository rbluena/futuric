import React from 'react';
import { Button } from '@app/components';

const Hero = () => (
  <div className="text-center px-2 py-12 bg-primary-800 text-neutral-50 ">
    <h1 className="text-3xl my-8">
      Create a link for content not published online yet.
    </h1>
    <h4 className="text-lg py-">
      Create and share a link for content you about to publish online in the
      near future.
      <br />
      Discover and get notified for online contents that will soon be published.
    </h4>

    <div className="w-52 mx-auto mt-8">
      <Button size="lg" variant="secondary" outline>
        Get Started
      </Button>
    </div>
  </div>
);

export default Hero;
