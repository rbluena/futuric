import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Link } from '@app/components';
import { HeartIcon } from '@app/components/Icons';

const Comment = ({ data }) => (
  <div className="flex max-w-sm p-2 py-4">
    <Avatar src={data.profile} alt={data.author} size="lg" />
    <section className="pl-3">
      <header>
        <p className="text-sm font-semibold text-neutral-700">{data.author}</p>
        <p className="text-xs text-neutral-500">{data.createdAt}</p>
      </header>
      <section className="text-sm py-3">{data.description}</section>
      <footer className="flex">
        <Link href="/" className="text-md font-semibold">
          Reply
        </Link>
        <div className="flex ml-auto">
          <button type="button">
            <HeartIcon variant="primary" size="sm" />
          </button>
          <span className="text-sm italic text-neutral-600">45</span>
        </div>
      </footer>
    </section>
  </div>
);

Comment.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Comment;
