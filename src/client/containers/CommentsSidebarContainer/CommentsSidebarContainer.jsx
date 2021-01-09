import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUnmount } from 'react-use';
import {
  getAuthSelector,
  linksStateSelector,
  commentsStateSelector,
  globalStateSelector,
} from '@app/selectors';
import { Sidebar, CommentBox, Comment, Button } from '@app/components';
import { toggleSidebar, openModal } from '@app/slices/globalSlice';
import {
  createCommentAction,
  updateCommentAction,
  deleteCommentAction,
  toggleCommentLikeAction,
  resetCommentsAction,
} from '@app/actions';

import { SIDEBARS } from '@app/constants';

const CommentsSidebarContainer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(getAuthSelector);
  const { activeLink } = useSelector(linksStateSelector);
  const { sidebar } = useSelector(globalStateSelector);
  const {
    comments: { data, meta },
  } = useSelector(commentsStateSelector);

  /**
   *
   * @param {*} commentData
   */
  function onSubmitComment(commentData) {
    dispatch(createCommentAction({ ...commentData, link: activeLink._id }));
  }

  function openSigninModal() {
    dispatch(openModal('signin'));
  }

  function deleteComment(commentId) {
    dispatch(deleteCommentAction(commentId));
  }

  function loadMoreComments() {}

  /**
   *
   */
  function toggleCommentLike(commentId) {
    dispatch(toggleCommentLikeAction(commentId));
  }

  function onClose() {
    dispatch(toggleSidebar());
    dispatch(resetCommentsAction());
  }

  function onSubmitUpdate(commentId, commentData) {
    dispatch(updateCommentAction(commentId, commentData));
  }

  useUnmount(() => {
    onClose();
  });

  return (
    <Sidebar isOpen={sidebar === SIDEBARS.comments}>
      <Sidebar.Header onClose={onClose}>
        <div className="">
          <h1 className="text-xl font-bold text-neutral-700">Comments</h1>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        {isAuthenticated && !activeLink.isCommentingDisabled ? (
          <CommentBox author={user} onSubmit={onSubmitComment} />
        ) : (
          <div className="px-4">
            <Button
              variant="primary"
              outline
              size="lg"
              onClick={openSigninModal}
            >
              Sign In
            </Button>
          </div>
        )}

        {/* start: RENDERING COMMENTS */}
        <div className="divide-y divide-neutral-200">
          {data && data.length ? (
            data.map((comment) => {
              const isCommentorCreatorOfPost = !!(
                comment.author._id === activeLink.owner._id
              );
              return (
                <Comment
                  comment={comment}
                  deleteComment={deleteComment}
                  onSubmitUpdate={onSubmitUpdate}
                  toggleCommentLike={toggleCommentLike}
                  isCommentorCreatorOfPost={isCommentorCreatorOfPost}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center h-60">
              <p className="text-2xl text-neutral-400">
                No comments available.
              </p>
            </div>
          )}
        </div>

        {/* end: RENDERING COMMENTS */}
      </Sidebar.Content>
    </Sidebar>
  );
};

export default CommentsSidebarContainer;
