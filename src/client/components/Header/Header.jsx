import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Hero } from '@app/components';
import FilterContainer from '@app/containers/FilterContainer';

const Header = ({ showHero, showTopics }) => (
  <div className="">
    <div className=" bg-white border-b border-primary-100">
      <Nav />
    </div>
    <div className="container mx-auto my-4">
      {showTopics && <FilterContainer />}
    </div>
    {showHero && <Hero />}
  </div>
);

Header.defaultProps = {
  showHero: false,
  showTopics: false,
};

Header.propTypes = {
  showHero: PropTypes.bool,
  showTopics: PropTypes.bool,
};

export default Header;
