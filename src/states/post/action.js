import api from '../../utils/api';

const ActionType = {
  RECEIVE_POST: 'RECEIVE_POST',
  ADD_POST: 'ADD_POST',
  TOGGLE_LIKE_POST: 'TOGGLE_LIKE_POST',
};

function receivePostActionCreator(post) {
  return {
    type: ActionType.RECEIVE_POST,
    payload: {
      post,
    },
  };
}

function addPostActionCreator(post) {
  return {
    type: ActionType.ADD_POST,
    payload: {
      post,
    },
  };
}

function toggleLikePostActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_POST,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddPost({ title, body }) {
  return async (dispatch) => {
    try {
      const post = await api.createPost({ title, body });
      dispatch(addPostActionCreator(post));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleLikePost(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikePostActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.toggleLikePost(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikePostActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralLikePost(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikePostActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.toggleNeutralLikePost(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikePostActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receivePostActionCreator,
  addPostActionCreator,
  asyncAddPost,
  toggleLikePostActionCreator,
  asyncToggleLikePost,
  asyncToggleNeutralLikePost,
};
