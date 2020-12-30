import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { Link, Avatar, Button } from '@app/components';
import { Dropdown } from '@app/components/Form';

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  function onChangeDropdownHandler(value) {
    if (value !== 'signout') {
      router.push(value);
    }
  }

  return (
    <nav className="relative py-6 max-w-6xl mx-auto">
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
          <Link className="px-2 font-bold" href="/links/create">
            Create Link
          </Link>
          <Link className="px-2 font-bold" href="/learn">
            Learn
          </Link>
          <Button
            outline
            size="sm"
            className="py-2 px-4 text-xs font-bold ml-5"
            onClick={() => dispatch(openModal('signin'))}
          >
            Sign In
          </Button>
        </div>

        <div className="relative">
          <button type="button" onClick={() => setToggleDropdown(true)}>
            <Avatar size="lg" src="" alt="profile" initials="RL" />
          </button>
          <Dropdown
            options={[
              [{ label: 'Profile', value: '/me' }],
              [
                { label: 'My Links', value: '/me/links' },
                { label: 'Waiting List', value: '/me/waitings' },
                { label: 'Notifications', value: '/me/notifications' },
              ],
              [{ label: 'Sign Out', value: '/signout' }],
            ]}
            onValueChanged={onChangeDropdownHandler}
            changeDropdownVisibility={(value) => setToggleDropdown(value)}
            isOpen={toggleDropdown}
          />
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {};

export default Nav;
