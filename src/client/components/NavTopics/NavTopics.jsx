import React from 'react';
import { Link } from '@app/components';
import topics from '@app/utils/topics.json';

const NavTopics = () => (
  <ul className="flex border border-neutral-200 border-l-0 border-r-0 justify-around mb-4 overflow-auto">
    {topics.map((item) => (
      <li className="" key={item.code}>
        <Link
          variant="secondary"
          href={`links/${item.code}`}
          className="font-light px-2"
          size="sm"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default NavTopics;
