import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Link } from '@app/components';

const Comment = ({ data }) => (
  <div className="flex max-w-sm p-2">
    <Avatar src={data.profile} alt={data.author} />
    <section className="pl-3">
      <header>
        <p className="text-sm font-semibold text-neutral-700">{data.author}</p>
        <p className="text-xs text-neutral-500">{data.createdAt}</p>
      </header>
      <section className="text-sm py-3">{data.description}</section>
      <footer>
        <Link href="/" className="text-sm">
          Reply
        </Link>
      </footer>
    </section>
  </div>
);

Comment.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Comment;
