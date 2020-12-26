import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '@app/components';

const Post = ({ post, publisher }) => (
  <PostCard small>
    <PostCard.Avatar src={publisher.image} small />
    <PostCard.Content title={post.title} small>
      <PostCard.Footer publisher={publisher} published small />
    </PostCard.Content>
  </PostCard>
);

Post.propTypes = {
  publisher: PropTypes.objectOf(PropTypes.shape).isRequired,
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Post;
