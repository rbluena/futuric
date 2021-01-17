import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleWaitingAction } from '@app/actions/links';
import Post from './Post';

const PostsContainer = ({ posts, title }) => {
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
    <div className="max-w-6xl mx-auto divide-y divide-neutral-100 py-4 pb-6">
      {title && title.length && (
        <div className="max-w-xl mx-auto border-b border-neutral-200 mb-4">
          <h2 className="text-lg pb-2">{title}</h2>
        </div>
      )}

      {posts.map((item) => (
        <Post
          key={item._id}
          owner={item.owner}
          post={item}
          toggleWaiting={toggleWaiting}
        />
      ))}
    </div>
  );
};

PostsContainer.defaultProps = {
  title: '',
  posts: [],
};

PostsContainer.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape),
};

export default PostsContainer;
