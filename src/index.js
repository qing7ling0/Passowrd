
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import AppWithNavigationState from './AppNavigator';
 
import ConfigureStore from './ConfigureStore';
const store = ConfigureStore();//获取store
 
export default class application extends Component{

  render(){
    return(
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
     );
   }
}