import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLinksStateSelector } from '@app/selectors';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const ViewLink = ({ link }) => {
  let owner = {};

  if (link) {
    owner = link.owner;
  }

  return (
    <div className="py-10">
      <div className=" max-w-3xl mx-auto">
        <Header link={link} owner={owner} />
        <Content link={link} />
        <Footer link={link} />
      </div>
    </div>
  );
};

ViewLink.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape).isRequired,
  // user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  link: getLinksStateSelector(state).activeLink || {},
  // user: getUserSelector(state),
});

export default connect(mapStateToProps)(ViewLink);
