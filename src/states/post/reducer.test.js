/**
 * test scenario for postReducer
 *
 * - postReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the post when given by RECEIVE_POST action
 *  - should return the post with the new post when given by ADD_POST action
 *  - should return the post with the toggled like post when given by TOGGLE_LIKE_POST action
 *
 */

import postReducer from './reducer';

describe('postReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = postReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the post when given by RECEIVE_POST action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_POST',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    // action
    const nextState = postReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.post);
  });

  it('should return the post with the new post when given by ADD_POST action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'ADD_POST',
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = postReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.post, ...initialState]);
  });

  it('should return the post with the toggled like post when given by TOGGLE_LIKE_POST action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_POST',
      payload: {
        userId: 'users-1',
        threadId: 'thread-1',
      },
    };

    // action: like post
    const nextState = postReducer(initialState, action);

    // assert
    expect(nextState).toEqual([{
      ...initialState[0],
      upVotesBy: [action.payload.userId],
    }]);

    // action: unlike post
    const nextState2 = postReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
