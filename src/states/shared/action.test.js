/**
 * scenario test
 *
 * - asyncPopulateUsersAndPost thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import api from '../../utils/api';
import { receivePostActionCreator } from '../post/action';
import { receiveUserActionCreator } from '../user/action';
import { asyncPopulateUsersAndPost } from './action';

const fakePostResponse = [
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

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndPost thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllUsers = api.getAllUsers;
    api._getAllPost = api.getAllPost;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllPost = api._getAllPost;

    // delete backup
    delete api._getAllUsers;
    delete api._getAllPost;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllPost = () => Promise.resolve(fakePostResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersAndPost()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receivePostActionCreator(fakePostResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUserActionCreator(fakeUsersResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllPost = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncPopulateUsersAndPost()(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
