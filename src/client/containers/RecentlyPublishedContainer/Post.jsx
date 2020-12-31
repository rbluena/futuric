import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '@app/components';

const Post = ({ post, publisher }) => (
  <PostCard>
    <PostCard.Header publisher={publisher} />
    <PostCard.Content post={post} />
  </PostCard>
);

Post.propTypes = {
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Post;
