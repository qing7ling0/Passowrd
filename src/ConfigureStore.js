'use strict';
 
import { createStore, applyMiddleware ,combineReducers} from 'redux';
import thunk from 'redux-thunk';//引入异步操作
import reduxPromiseMiddleware from 'redux-promise';
//引入所有的reducers,切记要在index.js封装下.
import reducers from './reducers/index';
const middlewares = [
  thunk,
  reduxPromiseMiddleware
];
 
const createSoreWithMiddleware=applyMiddleware(...middlewares)(createStore);
 
//配置store信息
export default function configureStore(initialState){
 
  //创建store
  const store=createSoreWithMiddleware(reducers,initialState);
   
  return store;
}