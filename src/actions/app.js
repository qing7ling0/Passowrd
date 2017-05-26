import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import DataService from '../modules/DataService';

export const login = createAction(types.LOGIN, DataService.login);

export const getAllAccountList = createAction(types.ACCOUNT_GET_LIST, DataService.getAllAccountList);

export const accountAdd = createAction(types.ACCOUNT_ADD, DataService.accountAdd);

export const accountUpdate = createAction(types.ACCOUNT_UPDATE, DataService.accountUpdate);

export const accountDelete = createAction(types.ACCOUNT_DELETE, DataService.accountDelete);