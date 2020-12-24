import React from 'react';
import { Link } from '@app/components';

const Footer = () => (
  <div className="p-4 bg-primary-100 sticky bottom-0 flex max-w-6xl mx-auto">
    <div className="text-neutral-600">
      {new Date().getFullYear()}&nbsp;&copy;&nbsp;Rabii Luena
    </div>
    <span>&nbsp;|&nbsp;&nbsp;&nbsp;</span>
    <ul className="flex">
      <li className="pr-2">
        <Link href="/about-us" size="sm">
          About
        </Link>
      </li>
      <li className="pr-2">
        <Link href="/privacy" size="sm">
          Terms
        </Link>
      </li>
      <li className="pr-2">
        <Link href="/learn" size="sm">
          Learn
        </Link>
      </li>
    </ul>
  </div>
);

export default Footer;
