import axios from 'axios';
import actionTypes from '../actionTypes';

export const lineLoginAuth = (params) => {
  return (dispatch) => {
    axios.get('http://localhost:1337/auth/line/callback', { params }).then((res) => {
      if (res.status === 200) {
          res.data.isAuth = true;
        dispatch({ type: actionTypes.USER_AUTHENTICATE, payload: res.data });
      } else {
          res.data.isAuth = false;
        dispatch({ type: actionTypes.USER_AUTHENTICATE, payload: {} });
      }
    });
  };
};

export const loginCheck = (bool) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_CHECK, payload: bool });
  }
}