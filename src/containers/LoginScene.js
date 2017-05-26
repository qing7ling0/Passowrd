import React, { Component } from 'react';
var ReactNative, {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight} = require('react-native');
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome';

import BaseComponent from '../components/BaseComponent'
import Button from '../components/Button'

import DeviceInfo from 'react-native-device-info';
import Device from '../constants/Device';
import Storage from '../utils/Storage';
import Actions from '../actions'
import * as Toast from '../utils/ToastUtil.js'
import * as Constants from '../constants/Constants.js'
import * as Config from '../constants/Config.js'
import StyleCreater from './StyleCreater.js'

// import MainScene from './MainScene.js';

const TEXT_PASSWORD_PLACEHOLDER = 'user'; 
const IMG_BG = require('../image/bg.png');
 
class LoginScene extends BaseComponent{

  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  componentWillMount() {
    Storage.get(Constants.STORAGE_KEY_USER).then((user) => {
      this.setState({
        user: user
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (!this.props.isConfigInited && nextProps.isConfigInited) {
    //   this._doLogin.bind(this)(nextProps.isConfigInited);
    // } else {
    //   if (nextProps.result.success && !this.props.result.success) {
    //     Storage.save(Constants.STORAGE_KEY_ACCOUNT, {account:this.state.account, password:this.state.password});
    //     // this.navigation.navigate('Login');
    //   } else if (!nextProps.result.success && !this.props.result.success) {
    //     if (nextProps.result.message !== '') {
    //       Toast.toastLong(nextProps.result.message);
    //     }
    //   }
    // }
  }

  _loginBtnPress(){
    if (this.state.user === '') {
      Toast.toastLong('用户名不能为空!');
      return;
    }
    const {login} = this.props;
    login(this.state.user);
  }

  render(){
    return(
      <View style={styles.Root}>
        <Image source={IMG_BG} style={styles.BackgroundImage} />
        <Text style={styles.LogoText}>PASSWORD</Text>
        <View style={styles.LoginInputContainer}>
          <Icon name="user-o" style={styles.LoginLabel} />
          <TextInput
            style={styles.LoginInput}
            onChangeText={(text) => this.setState({user:text})}
            value={this.state.user}
            keyboardType={'email-address'}
            placeholder={TEXT_PASSWORD_PLACEHOLDER}
            placeholderTextColor={'lightgrey'}
            underlineColorAndroid={"transparent"}
            maxLength={20}
          />
        </View>
        <Button
          style={styles.LoginBtnContainer}
          onPress={this._loginBtnPress.bind(this)}
          text={"登陆"}
          textStyle={styles.LoginBtnText}
          />
        <Text style={styles.textVersion}>Version:{DeviceInfo.getVersion()+'.'+Config.APP_VERSION}</Text>
      </View>
     );
   }
}

const styles = StyleCreater((baseStyle) => {
  return {
    Root: {
      ...baseStyle.Container,
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
    LogoText: {
      fontSize: Device.fontSize2RN(80),
      fontWeight: '900',
      color: '#fff',
      marginBottom: Device.px2RN(200),
    },
    LoginContainer: {
      ...baseStyle.ContainerColumn,
      width: Device.px2RN(350),
      height: Device.px2RN(300),
      padding: Device.px2RN(10)
    },
    LoginInputContainer: {
      ...baseStyle.ContainerRow,
      width: Device.px2RN(350),
      height: Device.px2RN(300),
      alignItems: 'flex-end',
      paddingBottom: Device.px2RN(50),
      marginTop: Device.px2RN(50),
    },
    LoginLabel: {
      flex:1,
      fontSize: Device.fontSize2RN(30),
      color: '#ddd',
      textAlign: 'left',
      marginRight: Device.px2RN(20),
      marginTop: Device.px2RN(20)
    },
    LoginInput: {
      width: Device.px2RN(300),
      height:Device.px2RN(50),
      fontSize: Device.fontSize2RN(30),
      padding:0,
      paddingLeft: Device.px2RN(5),
      paddingRight: Device.px2RN(5),
      borderBottomWidth: Device.px2RN(1),
      borderColor: '#fff',
      color: '#fff',
    },
    LoginBtnContainer: {
      position: 'absolute',
      right: Device.px2RN(145),
      bottom: Device.px2RN(150),
      width: Device.px2RN(350),
      height:Device.px2RN(60),
      backgroundColor: 'red',
      borderRadius: Device.px2RN(10),
      alignItems: 'center',
      justifyContent: 'center'
    },
    LoginBtnText: {
      fontSize: Device.fontSize2RN(25),
      color: '#fff',
    },
    textVersion: {
      position: 'absolute',
      right: Device.px2RN(10),
      bottom: Device.px2RN(10),
      fontSize: Device.fontSize2RN(18),
      color: '#fff'
    }

  }
});

export default connect(
  state => ({
    app:state.app
  }),
  (dispatch) => {
    return bindActionCreators({
      login: Actions.login,
    }, dispatch);
  }
)(LoginScene);