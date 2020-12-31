import React from 'react';
import { WidePosts, ContentWrapper } from '@app/components';
import Post from './Post';

const RecentlyPublishedContainer = () => (
  <ContentWrapper>
    <WidePosts heading="Recently published" viewLink="/somewhare">
      <div className="w-1/2">
        <Post
          publisher={{
            profile: '/@netflix',
            brandname: 'Netflix',
            image:
              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          }}
          post={{
            title:
              'Title of the next upload of the content. Here am trying to increase some of the text for now.',
            shortenUrl: 'https://shorten.com',
            postUrl: '/links/897364',
            longUrl: 'https://',
            availableAt: 'July 9th',
          }}
        />
      </div>
      <div className="w-1/2">
        <Post
          publisher={{
            profile: '/@netflix',
            brandname: 'Netflix',
            image:
              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          }}
          post={{
            title:
              'Title of the next upload of the content. Here am trying to increase some of the text for now.',
            shortenUrl: 'https://shorten.com',
            postUrl: '/links/897364',
            longUrl: 'https://',
            availableAt: 'July 9th',
          }}
        />
      </div>
      <div className="w-1/2">
        <Post
          publisher={{
            profile: '/@netflix',
            brandname: 'Netflix',
            image:
              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          }}
          post={{
            title:
              'Title of the next upload of the content. Here am trying to increase some of the text for now.',
            shortenUrl: 'https://shorten.com',
            postUrl: '/links/897364',
            longUrl: 'https://',
            availableAt: 'July 9th',
          }}
        />
      </div>
      <div className="w-1/2">
        <Post
          publisher={{
            profile: '/@netflix',
            brandname: 'Netflix',
            image:
              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          }}
          post={{
            title:
              'Title of the next upload of the content. Here am trying to increase some of the text for now.',
            shortenUrl: 'https://shorten.com',
            postUrl: '/links/897364',
            longUrl: 'https://',
            availableAt: 'July 9th',
          }}
        />
      </div>
    </WidePosts>
  </ContentWrapper>
);

RecentlyPublishedContainer.propTypes = {};

export default RecentlyPublishedContainer;
