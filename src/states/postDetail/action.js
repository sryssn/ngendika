import api from '../../utils/api';

const ActionType = {
  RECEIVE_POST_DETAIL: 'RECEIVE_POST_DETAIL',
  CLEAR_POST_DETAIL: 'CLEAR_POST_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_LIKE_POST_DETAIL: 'TOGGLE_LIKE_POST_DETAIL',
};

function receivePostDetailActionCreator(postDetail) {
  return {
    type: ActionType.RECEIVE_POST_DETAIL,
    payload: {
      postDetail,
    },
  };
}

function clearPostDetailActionCreator() {
  return {
    type: ActionType.CLEAR_POST_DETAIL,
  };
}

function addCommentActionCreator(post) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      post,
    },
  };
}

function toggleLikeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleLikePostDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_POST_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncToggleLikePostDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikePostDetailActionCreator({ userId: authUser.id }));

    try {
      await api.toggleLikePost(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikePostDetailActionCreator({ userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralLikePostDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikePostDetailActionCreator({ userId: authUser.id }));

    try {
      await api.toggleNeutralLikePost(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikePostDetailActionCreator({ userId: authUser.id }));
    }
  };
}

function asyncToggleLikeComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.toggleLikeComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralLikeComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.toggleNeutralLikeComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncReceivePostDetail(postId) {
  return async (dispatch) => {
    dispatch(clearPostDetailActionCreator());
    try {
      const postDetail = await api.getPostDetail(postId);
      dispatch(receivePostDetailActionCreator(postDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment({ content, id }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ content, id });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receivePostDetailActionCreator,
  clearPostDetailActionCreator,
  asyncReceivePostDetail,
  toggleLikeCommentActionCreator,
  asyncToggleLikeComment,
  asyncAddComment,
  addCommentActionCreator,
  asyncToggleNeutralLikeComment,
  toggleLikePostDetailActionCreator,
  asyncToggleLikePostDetail,
  asyncToggleNeutralLikePostDetail,
};
