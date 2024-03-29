import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLinksStateSelector } from '@app/selectors';
import { ContentWrapper } from '@app/components';
import Header from './Header';
import Editor from './Editor';

const EditLink = ({ link }) => {
  let owner = {};

  if (link) {
    owner = link.owner;
  }

  return (
    <ContentWrapper className="py-10 max-w-5xl mx-auto">
      <Header link={link || {}} owner={owner} />
      <Editor link={link || {}} />
    </ContentWrapper>
  );
};

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
