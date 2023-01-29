/**
 * scenario test
 *
 * - asyncAddPost thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

import api from '../../utils/api';
import { addPostActionCreator, asyncAddPost } from './action';

const fakeTitle = 'titletest';
const fakeBody = 'bodytest';
const fakePost = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddPost thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._createPost = api.createPost;
  });

  afterEach(() => {
    // restore original implementation
    api.createPost = api._createPost;

    // delete backup
    delete api._createPost;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createPost = () => Promise.resolve(fakePost);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddPost({ fakeTitle, fakeBody })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(addPostActionCreator(fakePost));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createPost = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncAddPost({ fakeTitle, fakeBody })(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
