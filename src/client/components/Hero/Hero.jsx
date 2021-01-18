import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { Button } from '@app/components';
import { getAuthSelector } from '@app/selectors';
import { MODALS } from '@app/constants';

const Hero = () => {
  const { isAuthenticated } = useSelector(getAuthSelector);
  const dispatch = useDispatch();

  return (
    <div className="text-center px-2 py-24 bg-primary-800 text-neutral-50 ">
      <h1 className="text-3xl md:text-4xl mb-8 font-bold">
        Discover what&apos;s coming next on the internet.
      </h1>
      <h2 className="text-2xl font-light">
        Publisher can claim and share a URL ahead of time. <br />
        Audience can choose to be notified once content is published online.
      </h2>

      {!isAuthenticated && (
        <div className="w-52 mx-auto mt-16">
          <Button
            size="lg"
            variant="secondary"
            outline
            onClick={() => dispatch(openModal(MODALS.signup))}
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Hero;
