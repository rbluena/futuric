import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLinksStateSelector, getUserSelector } from '@app/selectors';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const ViewLink = ({ link = {}, user = {} }) => {
  let owner = {};
  let isOwner = false;

  if (link) {
    owner = link.owner;
    isOwner = user._id === link.owner._id;
  }

  return (
    <div className="py-10">
      <div className=" max-w-3xl mx-auto">
        <Header link={link || {}} owner={owner} isOwner={isOwner} />
        <Content link={link || {}} />
        <Footer link={link || {}} isOwner={isOwner} />
      </div>
    </div>
  );
};

ViewLink.defaultProps = {
  link: {},
  user: {},
};

ViewLink.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
  user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  link: getLinksStateSelector(state).activeLink,
  user: getUserSelector(state),
});

export default connect(mapStateToProps)(ViewLink);
