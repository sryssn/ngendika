import api from '../../utils/api';
import { receivePostActionCreator } from '../post/action';
import { receiveUserActionCreator } from '../user/action';

function asyncPopulateUsersAndPost() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const post = await api.getAllPost();

      dispatch(receiveUserActionCreator(users));
      dispatch(receivePostActionCreator(post));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndPost };
