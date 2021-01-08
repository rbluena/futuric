import { decode } from 'jsonwebtoken';
import { mergeUpdatedItem } from '@app/utils/common';
import { setNotification, toggleSidebar } from '@app/slices/globalSlice';
import { logoutUserAction } from '@app/actions';
import {
  createCommentService,
  getCommentsService,
  getCommentService,
  updateCommentService,
  deleteCommentService,
} from '@app/services';

import {
  createComment,
  createCommentSuccess,
  createCommentFailure,
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
  getComment,
  getCommentSuccess,
  getCommentFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
} from '@app/slices/commentSlice';
import { SIDEBARS } from '@app/constants';

/**
 *
 * @param {Object} commentData
 */
export function createCommentAction(commentData) {
  return async (dispatch, getState) => {
    const {
      auth: { token },
      comments: {
        comments: { data: oldData, meta },
      },
    } = getState();
    try {
      dispatch(createComment());
      const user = decode(token);

      const { data } = await createCommentService(token, {
        ...commentData,
        author: user._id,
      });
      const updatedComments = mergeUpdatedItem(oldData || [], data);

      dispatch(
        createCommentSuccess({ data: updatedComments, meta: meta || {} })
      );
    } catch (err) {
      dispatch(createCommentFailure());

      if (err.status === 403) {
        dispatch(logoutUserAction());
      } else {
        const error = {
          type: 'error',
          message: err.errors,
        };
        dispatch(setNotification(error));
      }
    }
  };
}

/**
 * Action to update a particular comment.
 *
 * @param {String} commentId
 * @param {Object} commentData
 */
export function updateCommentAction(commentId, commentData) {
  return async (dispatch, getState) => {
    const {
      auth: { token },
      comments: {
        comments: { data: oldData, meta },
      },
    } = getState();
    try {
      dispatch(updateComment());

      const { data } = await updateCommentService(
        token,
        commentId,
        commentData
      );

      const updatedComments = mergeUpdatedItem(oldData, data);

      dispatch(
        updateCommentSuccess({ data: updatedComments, meta: meta || {} })
      );
    } catch (err) {
      dispatch(updateCommentFailure());

      if (err.status === 403) {
        dispatch(logoutUserAction());
      } else {
        const error = {
          type: 'error',
          message: err.errors,
        };
        dispatch(setNotification(error));
      }
    }
  };
}
/**
 * Action creator to delete comment.
 * @param {String} commentId
 */
export function deleteCommentAction(commentId) {
  return async (dispatch, getState) => {
    const {
      auth: { token },
      comments: { comments },
    } = getState();

    try {
      dispatch(deleteComment());

      const { data } = await deleteCommentService(token, commentId);
      const updatedComments = mergeUpdatedItem(comments.data, data);

      dispatch(deleteCommentSuccess(updatedComments));
    } catch (err) {
      dispatch(deleteCommentFailure());

      if (err.status === 403) {
        dispatch(logoutUserAction());
      } else {
        const error = {
          type: 'error',
          message: err.errors,
        };
        dispatch(setNotification(error));
      }
    }
  };
}

/**
 * Retrieving single comment.
 * @param {String} linkdId
 */
export function getCommentAction(id) {
  return async (dispatch) => {
    try {
      dispatch(getComment());
      const { data } = await getCommentService(id);
      dispatch(getCommentSuccess(data));
    } catch (err) {
      dispatch(getCommentFailure());
    }
  };
}

/**
 * Action creator to retrieve all comments.
 * @param {Object} options
 */
export function getCommentsAction(options) {
  return async (dispatch, getState) => {
    try {
      const {
        comments: { comments },
      } = getState();

      dispatch(getComments());

      const { data } = await getCommentsService(options);

      let newComments = {};

      if (comments.data && comments.data.length > 0) {
        newComments.data = [...comments.data, ...data.data];
        newComments.meta = data.meta;
      } else {
        newComments = data;
      }

      dispatch(getCommentsSuccess(newComments));
    } catch (err) {
      dispatch(getCommentsFailure());
    }
  };
}

export function toggleCommentLikeAction(id) {
  return async (dispatch, getState) => {
    const {
      auth: { token },
      comments: {
        comments: { data: oldData, meta },
      },
    } = getState();
    try {
      const { data } = await updateCommentService(token, id, { like: true });

      const updatedComments = mergeUpdatedItem(oldData, data);

      if (!data.parent) {
        // Updating parent comment.
        dispatch(
          updateCommentSuccess({ data: updatedComments, meta: meta || {} })
        );
      } else {
        // Updating from replies.
      }
    } catch (err) {
      dispatch(updateCommentFailure());
    }
  };
}

export function loadLinkCommentsAction(options = {}) {
  return async (dispatch) => {
    dispatch(toggleSidebar(SIDEBARS.comments));
    dispatch(getCommentsAction(options));
  };
}

export function loadRepliesAction(options) {}
