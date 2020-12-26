import React from 'react';
import PropTypes from 'prop-types';
import { Link, Avatar, Button } from '@app/components';
import {
  BellOutlineIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from '@app/components/Icons';

const Header = ({ active }) => (
  <div className="header flex border-b border-neutral-200">
    <div className="">
      <Link href="/" variant={active ? 'primary' : 'secondary'}>
        https://bit.ly/3eJm90H
      </Link>
      <br />
      <span className="text-neutral-600 text-xs">Mar 25 - 9:30 AM</span>

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
    </div>

    <div className="ml-auto">
      <div className="flex flex-wrap-reverse items-center">
        <div className="flex flex-col items-start pr-2">
          <Link
            href="/@netflix"
            variant="secondary"
            size="lg"
            className="font-bold"
          >
            Netflix
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
