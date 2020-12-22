import React from 'react';
import { Button } from '@app/components';

const Hero = () => (
  <div className="text-center py-12 bg-primary-600 text-neutral-50 ">
    <h1 className="text-4xl my-8">Share your upcoming online content.</h1>
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

Hero.propTypes = {};

export default Hero;
