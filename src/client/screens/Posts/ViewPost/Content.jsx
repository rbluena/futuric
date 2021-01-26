import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';

const Content = ({ post }) => (
  <div className="pt-6">
    <div
      className="text-base md:text-lg font-serif mb-3 font-light p-2 md:p-10"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: decode(post.description) }}
    />
  </div>
);

Content.defaultProps = {
  post: {},
};

Content.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape),
};

export default Content;
