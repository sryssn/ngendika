import { ActionType } from './action';

function postReducer(post = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_POST:
      return action.payload.post;
    case ActionType.ADD_POST:
      return [action.payload.post, ...post];
    case ActionType.TOGGLE_LIKE_POST:
      return post.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    default:
      return post;
  }
}

export default postReducer;
