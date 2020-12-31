import React from 'react';
import { NavCategories } from '@app/components';
import PostsContainer from '@app/containers/PostsContainer';
import { Select } from '@app/components/Form';

const AllLinks = () => (
  <div className="">
    <div className="max-w-6xl mx-auto flex">
      <div className=" fixed top-18">
        <NavCategories />
      </div>

      {/* start: filters */}
      <div className="mx-auto">
        <div className="border-b border-neutral-300 flex justify-around flex-wrap">
          <Select
            name="topic"
            options={[
              { label: 'Select Topic', value: '' },
              { label: 'Comedy', value: 'comedy' },
              { label: 'Pranks', value: 'pranks' },
            ]}
          />
          <Select
            name="availability"
            options={[
              { label: 'Select Availability', value: '' },
              { label: 'Today', value: 'today' },
              { label: 'This Week', value: 'this_week' },
            ]}
          />
        </div>
        {/* end: filters */}

        {/* start: all posts */}
        <PostsContainer />
        <PostsContainer />
        <PostsContainer />
        {/* end: all posts */}
      </div>
    </div>
  </div>
);

export default AllLinks;
