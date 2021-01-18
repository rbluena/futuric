import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Link } from '@app/components';
import { openModal } from '@app/slices/globalSlice';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-2">
      <p className="text-xs font-light text-center">
        By creating an account, you are agreeing to our&nbsp;
        <Link href="/terms" className="font-normal">
          Terms of Service
        </Link>
        &nbsp;and&nbsp;
        <Link href="/privacy" className="font-normal">
          Privacy Policy
        </Link>
      </p>
      <br />
      <div className="text-center">
        <p className="text-sm">Already have an account?</p>
        <Button
          variant="text-button"
          className="font-semibold text-primary-700 text-lg"
          onClick={() => dispatch(openModal('signin'))}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Footer;
