import React from 'react';
import { Link } from '@app/components';
import categories from './categories.json';

const NavCategories = () => (
  <ul className="p-2">
    {categories.map((item) => (
      <li key={item.path} className="my-3">
        <Link className="font-light text-xl" href={item.path}>
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

NavCategories.propTypes = {};

export default NavCategories;
