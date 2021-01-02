import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLinksStateSelector } from '@app/selectors';
import Header from './Header';
import Editor from './Editor';

const EditLink = ({ link }) => (
  <div className="py-10 max-w-5xl mx-auto">
    <Header link={link || {}} />
    <Editor link={link || {}} />
  </div>
);

EditLink.defaultProps = {
  link: {},
};

EditLink.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  link: getLinksStateSelector(state).activeLink,
});

export default connect(mapStateToProps)(EditLink);
