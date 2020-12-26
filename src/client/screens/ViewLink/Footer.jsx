import React from 'react';
import { Link } from '@app/components';

const Footer = () => (
  <div className="flex items-center">
    <Link href="/" size="xs" className="italic">
      <span className="mr-1">35</span>Comments
    </Link>
    <span className="ml-2 text-neutral-300">|</span>
    <div className="flex items-center">
      <Link href="/links/787388/analytics" size="xs" className="ml-2">
        Analytics
      </Link>
      <span className="ml-2 text-neutral-300">-</span>
      <Link href="/links/787388/edit" size="xs" className="ml-2">
        Activate
      </Link>
      <span className="ml-2 text-neutral-300">-</span>
      <Link href="/links/787388/edit" size="xs" className="ml-2">
        Edit post
      </Link>
      {/* <PencilIcon size="xs" className="ml-1" /> */}
      <span className="ml-2 text-neutral-300">-</span>
      <Link href="/" size="xs" className="ml-2">
        Delete post
      </Link>
    </div>
  </div>
);

export default Footer;
