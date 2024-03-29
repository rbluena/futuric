import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import millify from 'millify';
import { Avatar, Button } from '@app/components';
import { HeartIcon, HeartOutlineIcon, BadgeIcon } from '@app/components/Icons';
import CommentEditBox from './CommentEditBox';

const Comment = ({
  comment,
  // deleteComment,
  onSubmitUpdate,
  toggleCommentLike,
  isCommentorCreatorOfPost,
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const { author } = comment;
  const authorName =
    author.brandname && author.brandname.length
      ? author.brandname
      : `${author.firstname} ${author.lastname}`;
  const formattedDistance = formatDistanceStrict(
    Date.now(),
    new Date(comment.createdAt || Date.now())
  );

  function submitData() {
    onSubmitUpdate(comment._id, { text: editText });
    setEdit(false);
  }

  function onKeyDown(evt) {
    if (evt.code === 'Enter') {
      submitData();
    }
  }

  useEffect(() => {
    setEditText(comment.text);
    setEdit(false);
  }, [comment]);

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
            {isCommentorCreatorOfPost ? (
              <span className=" text-xs bg-neutral-600 text-white px-2 rounded-full">
                {authorName}
              </span>
            ) : (
              <span className="text-sm">{authorName}</span>
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

        {/* start: EDITING COMMENT */}
        {edit && comment.isCurrentUserAuthor ? (
          <CommentEditBox
            text={editText}
            onKeyDown={onKeyDown}
            onChange={(evt, value) => setEditText(value)}
            onCancel={() => {
              setEdit(false);
              setEditText(comment.text);
            }}
            onSubmit={submitData}
          />
        ) : (
          <section className="text-sm py-3 text-neutral-700">
            {comment.text}
          </section>
        )}
        {/* end: EDITING COMMENT */}
        <footer className="flex w-full">
          <div className="flex items-center">
            <Button
              variant="text-button"
              size="xs"
              className="flex items-center text-sm text-primary-700 hover:text-primary-900 hover:underline"
              onClick={() => toggleCommentLike(comment._id)}
            >
              {comment.isCurrentUserLiked ? (
                <HeartIcon size="xs" />
              ) : (
                <HeartOutlineIcon size="xs" />
              )}
              &nbsp;&nbsp;
              <span className="text-sm italic text-neutral-600">
                {millify(comment.likesCount || 0)}
              </span>
            </Button>
          </div>
          {/* <span className="mx-2 text-neutral-300">-</span>
          <Link href="/" className="text-md">
            Reply
          </Link> */}
          {comment.isCurrentUserAuthor && (
            <>
              <span className="mx-2 text-neutral-300">-</span>
              <Button
                variant="text-button"
                size="xs"
                className="flex items-center text-md text-primary-700 hover:text-primary-900 hover:underline"
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            </>
          )}
          {/* {comment.isCurrentUserAuthor && (
            <>
              <span className="mx-2 text-neutral-300">-</span>
              <Button
                variant="text-button"
                size="xs"
                className="flex items-center text-md text-primary-700 hover:text-primary-900 hover:underline"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </Button>
            </>
          )} */}
        </footer>
      </section>
    </div>
  );
};

Comment.defaultProps = {
  isCommentorCreatorOfPost: false,
};

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.shape).isRequired,
  toggleCommentLike: PropTypes.func.isRequired,
  onSubmitUpdate: PropTypes.func.isRequired,
  // deleteComment: PropTypes.func.isRequired,
  isCommentorCreatorOfPost: PropTypes.bool,
};

export default Comment;
