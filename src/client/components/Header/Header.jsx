import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavTopics, Hero } from '@app/components';

const Header = ({ showHero, showTopics }) => (
  <div>
    <div className="container mx-auto">
      <Nav />
      {showTopics && <NavTopics />}
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
