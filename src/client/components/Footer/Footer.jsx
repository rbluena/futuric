import React from 'react';
import { Link, DotSeparator } from '@app/components';
import {
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@app/components/Icons';

const Footer = () => (
  // <div className="transform -translate-x-2/2 left-1/2 w-full p-4 bg-primary-100 absolute bottom-0 flex max-w-6xl"></div>

  <div className="p-4 hidden md:block  bg-primary-100 fixed bottom-0 max-w-6xl">
    <div className="md:flex">
      <div className="text-neutral-900 font-bold">
        {new Date().getFullYear()}&nbsp;&copy;&nbsp;Asteyo, Inc.
      </div>
      <span className="pl-2">|</span>
      <ul className="flex flex-col  md:flex-row flex-wrap font-bold items-center">
        <li className="px-2">
          <Link href="/" size="sm">
            Home
          </Link>
        </li>
        <DotSeparator variant="primary" />
        <li className="px-2">
          <Link href="/privacy" size="sm">
            Privacy
          </Link>
        </li>
        <DotSeparator variant="primary" />
        <li className="px-2">
          <Link href="/terms" size="sm">
            Terms & Conditions
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
    <div className="flex justify-start mt-3 items-center">
      <Link href="https://www.linkedin.com/company/asteyo">
        <LinkedinIcon
          size="sm"
          className="text-primary-600 hover:text-primary-700"
        />
      </Link>
      &nbsp;&nbsp;
      <Link href="https://www.twitter.com/asteyocompany">
        <TwitterIcon
          size="sm"
          className="text-primary-600 hover:text-primary-700"
        />
      </Link>
      &nbsp;&nbsp;
      <Link href="https://www.instagram.com/asteyocompany">
        <InstagramIcon
          size="sm"
          className="text-primary-600 hover:text-primary-700"
        />
      </Link>
    </div>
  </div>
);

export default Footer;
