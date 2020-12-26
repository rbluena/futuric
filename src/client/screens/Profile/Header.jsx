import React from 'react';
import PropTypes from 'prop-types';
import { Link, Avatar, Button } from '@app/components';
import {
  BellOutlineIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  BadgeIcon,
} from '@app/components/Icons';

const Header = ({ active }) => (
  <div className="header flex flex-row-reverse border-b border-neutral-200">
    {/* <div className="">
      <Link href="/" variant={active ? 'primary' : 'secondary'}>
        https://bit.ly/3eJm90H
      </Link>
      <br />
      <div className="text-neutral-600 text-xs">
        <span className="font-bold text-neutral-800">Active:</span> Mar 25 -
        9:30 AM
      </div>

      <div className="border-neutral-200 pt-2 flex items-center">
        <Button
          variant="text-button"
          size=""
          className="mr-2"
          title="Get notified."
        >
          <BellOutlineIcon size="xs" className="text-primary-700" />
        </Button>
        <span className="text-neutral-500 mr-2">|</span>
        <Button variant="text-button" size="" className="mr-2">
          <TwitterIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <LinkedinIcon size="xs" className="text-primary-700" />
        </Button>
        <Button variant="text-button" size="" className="mr-2">
          <FacebookIcon size="xs" className="text-primary-700" />
        </Button>
      </div>
    </div> */}

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
            <BadgeIcon size="xs" className="text-success-700" />
          </Link>
          <Link href="/@" size="xs">
            Follow
          </Link>
        </div>
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
