import React from 'react';
// import Image from 'next/image';
import { Link } from '@app/components';

const Nav = () => (
  <nav className="relative py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <div className="relative flex items-center">
      {/* <Image
        className="h-8 w-auto sm:h-10"
        src="https://previews.123rf.com/images/saiful007/saiful0071905/saiful007190500632/123107777-infinite-logo-design-concept-template-vector.jpg"
        alt="Logo"
        layout="fill"
      /> */}
      <Link href="/">
        <img
          className="w-16 h-auto"
          src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/120510172/original/b9b64995b2f968881f004ab37ba34f418fc34301/make-a-fake-designer-logo.png"
          alt="logo"
        />
      </Link>

      <div className="mx-auto">
        <Link className="px-2 font-bold" href="/">
          Home
        </Link>
        <Link className="px-2 font-bold" href="/link/create">
          Create Link
        </Link>
        <Link className="px-2 font-bold" href="/auth/signin">
          Sign In
        </Link>
      </div>
    </div>
  </nav>
);

Nav.propTypes = {};

export default Nav;
