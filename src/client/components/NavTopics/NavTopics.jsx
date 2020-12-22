import React from 'react';
import { Link } from '@app/components';
import topics from './topics.json';

const NavTopics = () => (
  <ul className="flex border border-l-0 border-r-0 justify-around">
    {topics.map((item) => (
      <li className="">
        <Link
          variant="secondary"
          href={item.path}
          className="font-light px-2"
          size="sm"
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default NavTopics;
