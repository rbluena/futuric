import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavTopics, Hero } from '@app/components';

const Header = ({ showHero }) => (
  <div>
    <div className="container mx-auto">
      <Nav />
      <NavTopics />
    </div>
    {showHero && <Hero />}
  </div>
);

Header.propTypes = {};

export default Header;
