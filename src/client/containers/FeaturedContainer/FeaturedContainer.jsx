import React from 'react';
import { NavCategories } from '@app/components';
import FeaturedPosts from './FeaturedPosts';

const FeaturedContainer = () => (
  <div className="flex mt-12 mb-8 max-w-6xl mx-auto flex-wrap">
    <NavCategories categories={[]} />
    <FeaturedPosts posts={[]} />
  </div>
);

export default FeaturedContainer;
