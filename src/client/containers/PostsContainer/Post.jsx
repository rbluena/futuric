import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '@app/components';

const Post = ({ owner, post }) => (
  <PostCard>
    <PostCard.Header publisher={owner} alt={owner.brandname} />
    <PostCard.Content post={post} />
  </PostCard>
);

Post.propTypes = {
  owner: PropTypes.objectOf(PropTypes.shape).isRequired,
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Post;
