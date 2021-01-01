import React from 'react';
import { Link } from '@app/components';
import categories from '@app/utils/categories.json';

const NavCategories = () => (
  <ul className="p-2">
    {categories.map((item) => (
      <li key={item.code} className="my-3">
        <Link className="font-light text-xl" href={`/links/${item.code}`}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

NavCategories.propTypes = {};

export default NavCategories;
