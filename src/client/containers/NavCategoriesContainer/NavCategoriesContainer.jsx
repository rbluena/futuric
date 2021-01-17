import React, { useState } from 'react';
import { NavCategories, Button } from '@app/components';

const NavCategoriesContainer = () => {
  const [toggleCategories, setToggleCategories] = useState(false);

  return (
    <>
      <div
        className={`transition-all duration-500 ease-in-out transform left absolute block md:hidden  ${
          toggleCategories ? 'left-0' : '-left-1/2 -ml-4'
        }  z-50 bg-white shadow-md`}
      >
        <Button
          className="absolute -right-4 top-10 w-4 text-lg text-center"
          onClick={() => setToggleCategories(!toggleCategories)}
        >
          &gt;
        </Button>

        <NavCategories />
      </div>
      <div className="hidden md:block ">
        <NavCategories />
      </div>
    </>
  );
};

export default NavCategoriesContainer;
