import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import usersReducer from './user/reducer';
import isPreloadReducer from './isPreload/reducer';
import postReducer from './post/reducer';
import postDetailReducer from './postDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    post: postReducer,
    postDetail: postDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
