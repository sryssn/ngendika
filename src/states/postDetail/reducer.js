import { ActionType } from './action';

function postDetailReducer(postDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_POST_DETAIL:
      return action.payload.postDetail;
    case ActionType.CLEAR_POST_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return { ...postDetail, comments: [action.payload.post, ...postDetail.comments] };
    case ActionType.TOGGLE_LIKE_POST_DETAIL:
      return {
        ...postDetail,
        upVotesBy: postDetail.upVotesBy.includes(action.payload.userId)
          ? postDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : postDetail.upVotesBy.concat([action.payload.userId]),
      };
    case ActionType.TOGGLE_LIKE_COMMENT:
      return {
        ...postDetail,
        comments: postDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
            };
          }
          return comment;
        }),
      };
    default:
      return postDetail;
  }
}

export default postDetailReducer;
