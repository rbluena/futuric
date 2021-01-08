import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ post }) => (
  <div className="pt-10">
    <div className="focus:outline-none text-4xl font-serif py-1 font-light">
      {post.title}
    </div>

    <div className="text-lg font-serif mt-6 mb-3 font-light">
      {post.description}
    </div>
  </div>
);

Content.defaultProps = {
  post: {},
};

Content.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape),
};

export default Content;
