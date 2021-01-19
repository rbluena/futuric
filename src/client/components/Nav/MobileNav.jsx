/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, connect } from 'react-redux';
import { getUserSelector } from '@app/selectors';
import { openModal } from '@app/slices/globalSlice';
import { Link, Avatar, Button } from '@app/components';
import { Dropdown } from '@app/components/Form';
import { CloseIcon, MenuIcon } from '@app/components/Icons';

const MobileNav = ({ user }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  function onChangeDropdownHandler(value) {
    if (value === 'signout') {
      router.push('/signout');
    } else {
      router.push(value);
    }
  }

  return (
    <div className="visible md:hidden">
      <div className="flex flex-row  items-center px-2">
        <div className="flex items-start">
          <Button size="sm" onClick={() => setToggleMenu(true)}>
            <MenuIcon size="sm" />
          </Button>
          <span className="ml-1 font-light tracking-wide text-primary-700">
            BETA
          </span>
        </div>

        <div className="mx-auto">
          <Link href="/">
            <img className="w-24 h-auto" src="/images/logo.svg" alt="logo" />
          </Link>
        </div>

        {user && (
          <>
            <div className="">
              <button type="button" onClick={() => setToggleDropdown(true)}>
                <Avatar
                  size="lg"
                  src={user.image && user.image.thumbnail}
                  alt="profile"
                  initials={user.initials}
                />
              </button>
            </div>

            {/*  */}
            <div className="absolute w-full max-w-full m-0 p-0 left-0 flex justify-end pr-2">
              <Dropdown
                options={[
                  [{ label: 'Me', value: '/me' }],
                  [
                    { label: 'Links', value: '/me/links' },
                    { label: 'Waitlisted', value: '/me/waitings' },
                    // { label: 'Notifications', value: '/me/notifications' },
                  ],
                  [
                    { label: 'Settings', value: '/settings' },
                    { label: 'Sign Out', value: 'signout' },
                  ],
                ]}
                onValueChanged={onChangeDropdownHandler}
                changeDropdownVisibility={(value) => setToggleDropdown(value)}
                isOpen={toggleDropdown}
              />
            </div>
          </>
        )}
      </div>

      {/* start: navigation */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={`bg-white absolute w-full top-0 py-4  z-50  shadow-md ${
          !toggleMenu ? 'hidden' : 'h-screen opacity-100'
        }`}
        onClick={() => setToggleMenu(false)}
      >
        <Button
          variant="primary"
          className="right-1 top-1 absolute"
          size="sm"
          outline
          onClick={() => setToggleMenu(false)}
        >
          <CloseIcon size="sm" />
        </Button>
        <div className="flex flex-col divide-y divide-primary-100">
          <Link className="py-6 font-bold text-lg" href="/">
            Home
          </Link>
          <Link className="py-6 font-bold text-lg" href="/links">
            Explore
          </Link>
          {user ? (
            <Link className="py-6 font-bold text-lg" href="/links/create">
              Create
            </Link>
          ) : (
            <Button
              variant="text-button"
              className="hover:underline text-primary-700 font-bold text-lg py-6 hover:text-primary-900"
              onClick={() => dispatch(openModal('signin'))}
            >
              Create
            </Button>
          )}

          {!user && (
            <Button
              variant="primary"
              size="md"
              className="py-6  font-bold text-lg"
              onClick={() => dispatch(openModal('signin'))}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      {/* end: navigation */}
    </div>
  );
};

MobileNav.defaultProps = {
  user: null,
};

MobileNav.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

export default connect(mapStateToProps)(MobileNav);
