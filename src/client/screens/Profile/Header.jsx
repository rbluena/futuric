import React from 'react';
import PropTypes from 'prop-types';
import { Link, Avatar, Button } from '@app/components';
import { BadgeShieldIcon, CheckUserIcon } from '@app/components/Icons';

const Header = ({ active }) => (
  <div className="header border-b  border-neutral-200">
    <div className="mr-auto">
      <div className="flex flex-wrap-reverse items-center">
        <Avatar initials="NL" size="xl" className="text-2xl" />

        <div className="flex flex-col items-start pl-2">
          <Link
            href="/@netflix"
            variant="secondary"
            size="lg"
            className="font-bold flex items-center"
          >
            <span>Netflix</span>
            &nbsp;
            <BadgeShieldIcon size="sm" className="text-primary-700" />
            {/* <BadgeIcon size="xs" className="text-success-700" /> */}
          </Link>
          <Link href="/@" size="xs" variant="secondary" className="mb-2">
            https://netflix.com
          </Link>
        </div>

        <div className="ml-auto">
          {/* <Button variant="primary" outline className="flex items-center">
            Follow
          </Button> */}
          <Button variant="primary" className="flex items-center">
            Unfollow&nbsp;&nbsp;
            <CheckUserIcon size="xs" />
          </Button>
        </div>
      </div>
    </div>

    <div className=" pl-16 pb-4">
      <p className="text-sm text-neutral-900">
        Creat movies and awesome nature to awesome contents.
      </p>
    </div>
  </div>
);

Header.defaultProps = {
  active: true,
};

Header.propTypes = {
  active: PropTypes.bool,
};
export default Header;
