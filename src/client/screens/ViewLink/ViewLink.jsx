import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLinksStateSelector } from '@app/selectors';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const ViewLink = ({ post }) => {
  let owner = {};

  if (post) {
    owner = post.owner;
  }

  return (
    <div className="py-10">
      <div className=" max-w-3xl mx-auto">
        <Header post={post} owner={owner} />
        <Content post={post} />
        <Footer post={post} />
      </div>
    </div>
  );
};

ViewLink.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  // user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  post: getLinksStateSelector(state).activeLink || {},
  // user: getUserSelector(state),
});

export default connect(mapStateToProps)(ViewLink);
