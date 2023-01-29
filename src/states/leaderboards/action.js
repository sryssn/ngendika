import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getAllLeaderboards();

      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncLeaderboards,
};
