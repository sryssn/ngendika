/**
 * scenario test
 *
 * - asyncLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import api from '../../utils/api';
import { asyncLeaderboards, receiveLeaderboardsActionCreator } from './action';

const fakeLeaderboards = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllLeaderboards = api.getAllLeaderboards;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllLeaderboards = api._getAllLeaderboards;

    // delete backup
    delete api._getAllLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboards);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboards));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncLeaderboards()(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
