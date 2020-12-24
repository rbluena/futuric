import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@app/components';

const WidePosts = ({ heading, children, viewLink }) => (
  <section className="p-2">
    <header className="flex border-b-2 border-neutral-200 px-10">
      <h2 className="text-lg">{heading}</h2>
      {viewLink && viewLink.length > 0 && (
        <Link href={viewLink} size="sm" className=" ml-auto">
          View All
        </Link>
      )}
    </header>

    <div className="flex flex-wrap py-8">{children}</div>
  </section>
);

WidePosts.defaultProps = {
  viewLink: '',
};

WidePosts.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  viewLink: PropTypes.string,
};

export default WidePosts;
