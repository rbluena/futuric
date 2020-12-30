import React from 'react';
import { openModal } from '@app/slices/globalSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@app/components';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-4">
      <div className="text-center">
        <p className="text-sm mb-2">Don&apos;t have an account?</p>
        <Button
          variant="text-button"
          className="font-semibold text-lg text-primary-700"
          onClick={() => dispatch(openModal('signup'))}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};
export default Footer;
