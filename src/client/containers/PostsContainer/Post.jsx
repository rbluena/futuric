import React from 'react';
import { PostCard } from '@app/components';

const Post = () => (
  <PostCard>
    <PostCard.Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
    <PostCard.Content
      postUrl="/links/897364"
      title="Title of the next upload of the content. Here am trying to increase some of the text for now."
    >
      <PostCard.Footer
        publisher={{
          url: '/@netflix',
          name: 'Netflix',
          activeDate: 'July 9th',
        }}
      />
    </PostCard.Content>
  </PostCard>
);

export default Post;
