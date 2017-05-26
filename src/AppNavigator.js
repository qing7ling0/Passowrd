
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScene from './containers/LoginScene';
import SplashScene from './containers/SplashScene';
import MainScene from './containers/MainScene';

export const AppNavigator = StackNavigator({
    Splash: { 
      screen: SplashScene,
      navigationOptions: {
        title: 'Home',    //设置navigator的title
        header: () => {
        }
      }
    },
    Login: { 
      screen: LoginScene,
      navigationOptions: {
        title: '登陆',    //设置navigator的title
        header: () => {
        }
      }
    },
    Main: { 
      screen: MainScene,
        style: {
                backgroundColor: 'red'
            },
      navigationOptions: {
        title: 'Password',
        header: () => {
        }
      },
    },
  },
  {
    initialRouteName: 'Splash', // 默认显示界面 
    mode: 'modal',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    cardStyle: {backgroundColor:'red'},
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);