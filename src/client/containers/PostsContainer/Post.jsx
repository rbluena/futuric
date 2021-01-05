import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '@app/components';

const Post = ({ owner, post, toggleWaiting }) => (
  <PostCard>
    <PostCard.Header publisher={owner} alt={owner.brandname} />
    <PostCard.Content post={post} toggleWaiting={toggleWaiting} />
  </PostCard>
);

Post.propTypes = {
  owner: PropTypes.objectOf(PropTypes.shape).isRequired,
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  toggleWaiting: PropTypes.func.isRequired,
};

export default Post;
