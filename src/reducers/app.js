
import {handleActions} from 'redux-actions';
import * as ActionTypes from '../constants/ActionTypes';
import * as actions from '../actions'

const initialState = {
  user: '',
  accountInfoList: [],
};

const app = (state = initialState, action) => {
  let data = {}
  if (action && action.payload) {
    data = action.payload;
  }
  switch(action.type) {
    case ActionTypes.LOGIN:
      return Object.assign({}, state, {user:data.user});
    case ActionTypes.ACCOUNT_GET_LIST:
      return Object.assign({}, state,{accountInfoList:data.list}, );
    case ActionTypes.ACCOUNT_ADD:
    {
      if (data.success) {
        return Object.assign({}, state, {accountInfoList:data.list}, );
      }
      return Object.assign({}, state);
    }
    case ActionTypes.ACCOUNT_DELETE:
    {
      if (data.success) {
        return Object.assign({}, state, {accountInfoList:data.list}, );
      }
      return Object.assign({}, state);
    }
    case ActionTypes.ACCOUNT_UPDATE:
    {
      if (data.success) {
        return Object.assign({}, state, {accountInfoList:data.list}, );
      }
      return Object.assign({}, state);
    }
  }
  return Object.assign({}, state);
}
export default app;