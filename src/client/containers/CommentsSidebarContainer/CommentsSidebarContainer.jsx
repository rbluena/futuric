import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthSelector,
  linksStateSelector,
  commentsStateSelector,
} from '@app/selectors';
import { Sidebar, CommentBox, Comment, Button } from '@app/components';
import { openModal } from '@app/slices/globalSlice';
import { createCommentAction } from '@app/actions';

const CommentsSidebarContainer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(getAuthSelector);
  const { activeLink } = useSelector(linksStateSelector);
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

  function loadMoreComments() {}

  return (
    <Sidebar isOpen>
      <Sidebar.Header>
        <div className="">
          <h1 className="text-xl font-bold text-neutral-700">
            Comments <span>(500)</span>
          </h1>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        {isAuthenticated ? (
          <CommentBox author={user} onSubmit={onSubmitComment} />
        ) : (
          <Button variant="primary" outline size="lg" onClick={openSigninModal}>
            Sign In
          </Button>
        )}

        {/* start: RENDERING COMMENTS */}
        {data &&
          data.length &&
          data.map((comment) => <Comment comment={comment} />)}

        {/* end: RENDERING COMMENTS */}
      </Sidebar.Content>
    </Sidebar>
  );
};

export default CommentsSidebarContainer;
