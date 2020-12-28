import React from 'react';
import { Link } from '@app/components';

const Footer = () => (
  <div className="max-w-xs mt-4">
    <p className="text-xs font-light text-center">
      By creating an account, you are agreeing to our&nbsp;
      <Link href="/terms" className="font-normal">
        Terms of Service
      </Link>
      &nbsp;and&nbsp;
      <Link href="/terms" className="font-normal">
        Privacy Policy
      </Link>
    </p>
    <br />
    <div className="text-center">
      <p className="text-sm mb-2">Already have an account?</p>
      <Link href="/auth/login" className="font-semibold">
        Sign in
      </Link>
    </div>
  </div>
);

export default Footer;
