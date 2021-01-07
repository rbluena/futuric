import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, connect } from 'react-redux';
import { getUserSelector } from '@app/selectors';
import { openModal } from '@app/slices/globalSlice';
// import { logoutUserAction } from '@app/actions';
import { Link, Avatar, Button } from '@app/components';
import { Dropdown } from '@app/components/Form';

const Nav = ({ user }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  function onChangeDropdownHandler(value) {
    if (value === 'signout') {
      window.location.href = '/signout';
    } else {
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
          <Link className="px-2 font-bold" href="/links">
            Explore
          </Link>
          {user ? (
            <Link className="px-2 font-bold" href="/links/create">
              Create
            </Link>
          ) : (
            <Button
              variant="text-button"
              className="hover:underline text-primary-700 font-bold text-base hover:text-primary-900"
              onClick={() => dispatch(openModal('signin'))}
            >
              Create
            </Button>
          )}
          <Link className="px-2 font-bold" href="/learn">
            Learn
          </Link>

          {!user && (
            <Button
              outline
              size="sm"
              className="py-2 px-4 text-xs font-bold ml-5"
              onClick={() => dispatch(openModal('signin'))}
            >
              Sign In
            </Button>
          )}
        </div>

        {user && (
          <div className="relative">
            <button type="button" onClick={() => setToggleDropdown(true)}>
              <Avatar
                size="lg"
                src={user.image}
                alt="profile"
                initials={user.initials}
              />
            </button>
            <Dropdown
              options={[
                [{ label: 'Me', value: '/me' }],
                [
                  { label: 'Links', value: '/me/links' },
                  { label: 'Waitlisted', value: '/me/waitings' },
                  { label: 'Notifications', value: '/me/notifications' },
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
        )}
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  user: null,
};

Nav.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  user: getUserSelector(state),
});

export default connect(mapStateToProps)(Nav);
