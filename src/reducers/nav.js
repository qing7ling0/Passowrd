
import {handleActions} from 'redux-actions';
import * as ActionTypes from '../constants/ActionTypes';
import * as actions from '../actions'

import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Splash');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

const nav = (state = initialNavState, action) => {
  let nextState;
  switch(action.type) {
    case ActionTypes.LOGIN:
      nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Main' }),
          state
        );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav