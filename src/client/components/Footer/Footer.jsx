import React from 'react';
import { Link, DotSeparator } from '@app/components';

const Footer = () => (
  // <div className="transform -translate-x-2/2 left-1/2 w-full p-4 bg-primary-100 absolute bottom-0 flex max-w-6xl"></div>
  <div className="p-4 bg-primary-100 fixed bottom-0 flex max-w-6xl mx-auto">
    <div className="text-neutral-900 font-bold">
      {new Date().getFullYear()}&nbsp;&copy;&nbsp;Asteyo, Inc.
    </div>
    <span className="pl-2">|</span>
    <ul className="flex font-bold items-center">
      {/* <li className="pr-2">
        <Link href="/about-us" size="sm">
          About
        </Link>
      </li> */}
      <li className="px-2">
        <Link href="/privacy" size="sm">
          Privacy
        </Link>
      </li>
      <DotSeparator variant="primary" />
      <li className="px-2">
        <Link href="/terms" size="sm">
          Terms of Use
        </Link>
      </li>
      {/* <DotSeparator variant="primary" />
      <li className="px-2">
        <Link href="/learn" size="sm">
          Learn
        </Link>
      </li> */}
    </ul>
  </div>
);

export default Footer;
