import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetching: false,
  comments: {},
  active: null,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    createComment: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    createCommentSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.comments = payload;
      },
    },
    createCommentFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    updateComment: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    updateCommentSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.comments = payload;
      },
    },
    updateCommentFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getComments: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    getCommentsSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = true;
        state.links = payload;
      },
    },
    getCommentsFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getComment: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getCommentSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    getCommentFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    deleteComment: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    deleteCommentSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    deleteCommentFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    toggleLike: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    toggleLikeSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.links = payload;
      },
    },
    toggleLikeFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
  },
});

export const {
  createComment,
  createCommentSuccess,
  createCommentFailure,
  updateComment,
  updateCommentSuccess,
  updateCommentFailure,
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
  getComment,
  getCommentSuccess,
  getCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  removeCreatedLink,
  toggleLike,
  toggleLikeSuccess,
  toggleLikeFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
