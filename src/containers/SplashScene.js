import React, { Component } from 'react';
var ReactNative, {
  View,
  Animated,
  Image,
  Easing,
  Text} = require('react-native');
import {Provider} from 'react-redux';

import LoginScene from './LoginScene.js'
import BaseComponent from '../components/BaseComponent'
import Device from '../constants/Device';
import StyleCreater from './StyleCreater.js'
 
const IMG_BG = require('../image/bg.png');
 
export default class SplashScene extends BaseComponent{ 

  constructor(props) {
    super(props);
    this.dis = Device.px2RN(640);
    this.state = {
      movePos: new Animated.Value(-this.dis),
    };
  }

  render() {
    return(
      <View
        style={styles.Root}>
          <Image source={IMG_BG} style={styles.BackgroundImage} />

          <Animated.Text
            style={{
              left: this.state.movePos,
              fontSize: Device.px2RN(60),
              fontWeight: '900',
              color:'#fff'
            }}
          >Wu Qingqing works</Animated.Text>
      </View>
    );
  }
  
  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.movePos,         // Auto-multiplexed
        {
          toValue: 0,
          easing: Easing.ease,
          duration: 300
        } // Back to zero
      ).start(),
      Animated.timing(
        this.state.movePos,         // Auto-multiplexed
        {
          toValue: 0,
          easing: Easing.ease,
          duration: 700
        } // Back to zero
      ).start((ret) => {
          if (ret.finished) {
            this.navigation.navigate('Login');
          }
      })
    ]);
  }
}
const styles = StyleCreater((baseStyle) => {
  return {
    Root: {
      ...baseStyle.ContainerRow,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'black'
    },
    BackgroundImage: {
      position: 'absolute',
      opacity: 0.5,
      resizeMode: 'cover',
      flexDirection:'column',
      width: Device.size.width,
      height: Device.size.height
    },

  }
});