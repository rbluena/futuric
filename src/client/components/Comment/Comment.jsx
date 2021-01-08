import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import millify from 'millify';
import { Avatar, Link, Button } from '@app/components';
import { HeartIcon, BadgeIcon } from '@app/components/Icons';

const Comment = ({ comment }) => {
  const { author } = comment;
  const formattedDistance = formatDistanceStrict(
    Date.now(),
    new Date(comment.createdAt || Date.now())
  );

  return (
    <div className="flex max-w-sm p-2 py-6 bg-white pl-4">
      <Avatar
        src={author.image && author.image.thumbnail}
        initials={author.brandname[0]}
        alt={author.brandname}
      />
      <section className="pl-3 w-full">
        <header>
          <p className="font-semibold text-neutral-700 flex items-center">
            {comment.isCurrentUserAuthor ? (
              <span className=" text-xs bg-neutral-600 text-white px-2 rounded-full">
                {author.brandname}
              </span>
            ) : (
              <span className="text-sm">{author.brandname}</span>
            )}
            {author.prominent && (
              <BadgeIcon size="xs" className="text-success-500" />
            )}
          </p>
          <p className="text-xs font-bold text-neutral-500 pt-1">
            {formattedDistance.includes('seconds')
              ? 'Now'
              : `${formattedDistance} ago`}
          </p>
        </header>
        <section className="text-sm py-3 text-neutral-700">
          {comment.text}
        </section>
        <footer className="flex w-full">
          <div className="flex items-center">
            <Button
              variant="text-button"
              size="xs"
              className="flex items-center text-sm text-primary-700 hover:text-primary-900 hover:underline"
            >
              <HeartIcon size="xs" />
              &nbsp; &nbsp;
              <span className="text-sm italic text-neutral-600">
                {millify(comment.likesCount || 0)}
              </span>
            </Button>
          </div>
          <span className="mx-2 text-neutral-300">-</span>
          <Link href="/" className="text-md font-semibold">
            Reply
          </Link>
        </footer>
      </section>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Comment;
