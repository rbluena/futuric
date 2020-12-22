import React from 'react';
import {
  BadgeIcon,
  BadgeOutlineIcon,
  BellIcon,
  BellOutlineIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  VerticalOutlineIcon,
  CloseIcon,
} from './index';

const Icons = () => (
  <div className="flex max-w-md bg-neutral-200 p-4">
    <BadgeIcon className=" text-primary-800" />
    <BadgeOutlineIcon className="text-primary-800" />
    <BellIcon className="text-primary-700" />
    <BellOutlineIcon className="text-primary-700" />
    <ChevronLeftIcon className="text-primary-700" />
    <ChevronRightIcon className="text-primary-800" />
    <ChevronDownIcon className="text-primary-800" />
    <VerticalOutlineIcon className="text-primary-800" />
    <CloseIcon className="text-primary-800" />
  </div>
);

export default Icons;
