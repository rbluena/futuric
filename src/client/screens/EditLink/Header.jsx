import React from 'react';
import PropTypes from 'prop-types';
import { Link, Avatar } from '@app/components';
import { BadgeIcon } from '@app/components/Icons';

const Header = ({ active }) => (
  <div className="header flex border-b pb-2 border-neutral-200">
    <div className="">
      <Link
        href="https://bit.ly/3eJm90H"
        variant={active ? 'primary' : 'secondary'}
      >
        https://bit.ly/3eJm90H
      </Link>
      <br />
      <div className="text-neutral-600 text-xs">
        <span className="font-bold text-neutral-800">Posted:</span> Mar 25
      </div>
      <div className="text-neutral-600 text-xs">
        <span className="font-bold text-neutral-800">Active:</span> Not
        Activeted
      </div>
    </div>

    <div className="ml-auto">
      <div className="flex flex-wrap-reverse items-center">
        <div className="flex flex-col items-start pr-2">
          <Link
            href="/@netflix"
            variant="secondary"
            size="lg"
            className="font-bold flex items-center"
          >
            <span>Netflix</span>
            &nbsp;
            <BadgeIcon size="xs" className="text-success-700" />
          </Link>
          <Link href="/@" size="xs">
            Follow
          </Link>
        </div>
        <Avatar initials="NL" size="xl" className="text-2xl" />
      </div>
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
