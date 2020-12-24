import React from 'react';
import PropTypes from 'prop-types';
import Posts from './Posts';

const PostsContainer = ({ sidebar }) => (
  <div className="flex mt-12 mb-8 max-w-6xl mx-auto flex-wrap">
    {sidebar && sidebar}
    <Posts posts={[]} />
  </div>
);

PostsContainer.defaultProps = {
  sidebar: null,
};

PostsContainer.propTypes = {
  sidebar: PropTypes.node,
};

export default PostsContainer;
