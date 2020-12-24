import React from 'react';
import { Link } from '@app/components';
import topics from './topics.json';

const NavTopics = () => (
  <ul className="flex border border-neutral-200 border-l-0 border-r-0 justify-around mb-4">
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
