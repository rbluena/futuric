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
        <Link href="/">
          <img className="w-24 h-auto" src="/images/logo.svg" alt="logo" />
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
