/**
 * scenario test
 *
 * - asyncAddComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

import api from '../../utils/api';
import { addCommentActionCreator, asyncAddComment } from './action';

const fakeContent = 'contenttest';
const fakeId = 'comment-1';
const fakeComment = {
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
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._createComment = api.createComment;
  });

  afterEach(() => {
    // restore original implementation
    api.createComment = api._createComment;

    // delete backup
    delete api._createComment;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.resolve(fakeComment);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddComment({ fakeContent, fakeId })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncAddComment({ fakeContent, fakeId })(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
