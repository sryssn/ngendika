/**
 * scenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly when asyncUnsetAuthUser called
 */

import api from '../../utils/api';
import {
  asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator,
} from './action';

const fakeToken = {
  status: 'success',
  message: 'ok',
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw',
  },
};

const fakeEmptyToken = '';

const fakeAuthUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeEmail = 'john@example.com';
const fakePassword = 'john12345';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeToken);
    api.putAccessToken(fakeToken);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({ fakeEmail, fakePassword })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncSetAuthUser({ fakeEmail, fakePassword })(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser', () => {
  beforeEach(() => {
    // backup original implementation
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    // restore original implementation
    api.putAccessToken = api._putAccessToken;

    // delete backup
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when asyncUnsetAuthUser called', async () => {
    // arrange
    // stub implementation
    api.putAccessToken(fakeEmptyToken);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});
