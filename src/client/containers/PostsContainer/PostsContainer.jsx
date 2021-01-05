import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleWaitingAction } from '@app/actions/links';
import Post from './Post';

const PostsContainer = ({ sidebar, posts }) => {
  const dispatch = useDispatch();

  /**
   * This function is used for adding and removing item
   * waiting list.
   *
   * @param {String} linkId ID a link post.
   * @param {String} type add | remove
   */
  function toggleWaiting(linkId, type) {
    dispatch(toggleWaitingAction(linkId, type));
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
