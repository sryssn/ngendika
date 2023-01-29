/**
 * test scenario for postDetailReducer
 *
 * - postDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the postDetail when given by RECEIVE_POST_DETAIL action
 *  - should return null when given by CLEAR_POST_DETAIL action
 *  - should return the postDetail when given by ADD_COMMENT action
 *  - should return the postDetail when given by TOGGLE_LIKE_POST_DETAIL action
 *  - should return the postDetail when given by TOGGLE_LIKE_COMMENT action
 */

import postDetailReducer from './reducer';

describe('postDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the postDetail when given by RECEIVE_POST_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_POST_DETAIL',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.postDetail);
  });

  it('should return null when given by CLEAR_POST_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'CLEAR_POST_DETAIL',
      payload: null,
    };

    // action
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return null when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      { ...initialState, comments: [action.payload.post, ...initialState.comments] },
    );
  });

  it('should return the postDetail when given by TOGGLE_LIKE_POST_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'TOGGLE_LIKE_POST_DETAIL',
      payload: { userId: 'users-1' },
    };

    // action: like post
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });

    // action: unlike post
    const nextState2 = postDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the postDetail when given by TOGGLE_LIKE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'TOGGLE_LIKE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-1',
      },
    };

    // action: like comment
    const nextState = postDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], upVotesBy: [action.payload.userId] }],
    });

    // action: unlike comment
    const nextState2 = postDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
