import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleWaitingAction } from '@app/actions/links';
import Post from './Post';

const PostsContainer = ({ sidebar, posts }) => {
  const dispatch = useDispatch();

  function toggleWaiting(linkId) {
    dispatch(toggleWaitingAction(linkId, 'remove'));
  }

  return (
    <div className="flex mt-12 mb-8 max-w-6xl mx-auto flex-wrap">
      {sidebar && sidebar}

      <div className="mx-auto">
        {posts.map((item) => (
          <Post
            key={item._id}
            owner={item.owner}
            post={item}
            toggleWaiting={toggleWaiting}
          />
        ))}
      </div>
    </div>
  );
};

PostsContainer.defaultProps = {
  sidebar: null,
  posts: [],
};

PostsContainer.propTypes = {
  sidebar: PropTypes.node,
  posts: PropTypes.arrayOf(PropTypes.shape),
};

export default PostsContainer;
