import React from 'react';
import { Aside } from '@app/components';
import Post from './Post';

const FeaturedPostsContainer = () => (
  <Aside title="Featured">
    <Post
      publisher={{
        url: '/@netflix',
        name: 'Netflix',
        activeDate: 'July 9th',
        image:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
      post={{
        title:
          'Title of the next upload of the content. Here am trying to increase some of the text for now.',
      }}
    />
    <Post
      publisher={{
        url: '/@netflix',
        name: 'Netflix',
        activeDate: 'July 9th',
        image:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
      post={{
        title:
          'Title of the next upload of the content. Here am trying to increase some of the text for now.',
      }}
    />
    <Post
      publisher={{
        url: '/@netflix',
        name: 'Netflix',
        activeDate: 'July 9th',
        image:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
      post={{
        title:
          'Title of the next upload of the content. Here am trying to increase some of the text for now.',
      }}
    />
    <Post
      publisher={{
        url: '/@netflix',
        name: 'Netflix',
        activeDate: 'July 9th',
        image:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
      post={{
        title:
          'Title of the next upload of the content. Here am trying to increase some of the text for now.',
      }}
    />
  </Aside>
);

export default FeaturedPostsContainer;
