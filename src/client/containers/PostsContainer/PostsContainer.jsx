import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostsContainer = ({ sidebar, posts }) => (
  <div className="flex mt-12 mb-8 max-w-6xl mx-auto flex-wrap">
    {sidebar && sidebar}

    <div className="mx-auto">
      {posts.map((item) => (
        <Post owner={item.owner} post={item} />
      ))}
    </div>
  </div>
);

PostsContainer.defaultProps = {
  sidebar: null,
  posts: [],
};

PostsContainer.propTypes = {
  sidebar: PropTypes.node,
  posts: PropTypes.arrayOf(PropTypes.shape),
};

export default PostsContainer;
