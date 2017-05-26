import React, { Component } from 'react';
var ReactNative, {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Modal,
  SectionList} = require('react-native');

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

import BaseComponent from '../components/BaseComponent'
import Button from '../components/Button'
import Device from '../constants/Device';
import Storage from '../utils/Storage';
import Actions from '../actions'
import * as Toast from '../utils/ToastUtil.js'
import * as Constants from '../constants/Constants.js'
import * as Config from '../constants/Config.js'

const IMG_BG = require('../image/bg.png');

const TEXT_COMPANY_PLACEHOLDER = 'company';
const TEXT_ACCOUNT_PLACEHOLDER = 'account';
const TEXT_PASSWORD_PLACEHOLDER = 'password'; 



class MainScene extends BaseComponent{

  constructor(props) {
    super(props);

    this.setAddAccountInfo = this._setAddAccountInfo.bind(this);
    this.setEditorAccountInfo = this._setEditorAccountInfo.bind(this);

    this.state = {
      modalVisible:false,
      modalEditorVisible: false,
      addAccountInfo: {
        id: 0,
        company: '',
        account: '',
        password: '',
      },
      editorAccountInfo: {
        id: 0,
        company: '',
        account: '',
        password: ''
      },
      data: []
    }
    // this.data = [
    //   {
    //     id:0, key:'1', title:'1', data:[
    //       {id:0, title:'1-1'},
    //       {id:1, title:'1-2'},
    //       {id:2, title:'1-3'}
    //     ]
    //   },
    //   {
    //     id:2, key:'2', title:'2', data:[
    //       {id:0, title:'2-1'},
    //       {id:1, title:'2-2'},
    //       {id:2, title:'2-3'},
    //       {id:3, title:'2-4'},
    //       {id:4, title:'2-5'},
    //     ]
    //   },
    //   {
    //     id:3, key:'3', title:'3', data:[
    //       {id:0, title:'3-1'},
    //       {id:1, title:'3-2'},
    //       {id:2, title:'3-3'},
    //       {id:3, title:'3-4'},
    //       {id:4, title:'3-5'},
    //     ]
    //   }
    // ]
  }

  componentWillMount() {
    const {app, getAllAccountList} = this.props;
    getAllAccountList(app.user);
  }

  componentWillReceiveProps(nextProps) {
  }

  _initData(list) {
    let data = list.map((item, index) => {
      let _data = item.data.map((item, index) => {
        return {...item, key:'info'+item.id+"index"}
      })
      return {...item, key:'cm-'+item.company, data:_data}
    })
    return data;
  }

  _renderRowClick(rowData) {
  }

  _renderRow({item}) {
    return (
      <Button 
        style={styles.SectionItemContainer} 
        onPress={() => {
          this._pressItem.bind(this)(item);
        }}
      >
        <Text style={styles.SectionTitleText}>{item.account}</Text>
      </Button>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderTitle}>PASSWORD</Text>
        <Button style={styles.HeaderAccountAdd}
          onPress={()=> this.setState({
            modalVisible: true,
          })}
        >
          <Icon
            name='user-plus' 
            color='#fff'
            size={30}  />
        </Button>
      </View>
    );
  }

  _renderSectionHeader({section}) {
    return (
      <View style={styles.SectionTitleContainer}>
        <Icon name="angle-down" style={styles.SectionTitleArrow} />
        <Text style={styles.SectionTitleText}>{section.company}</Text>
      </View>
    );
  }

  _onViewableItemsChanged (info: {
      changed: Array<{
        key: string, 
        isViewable: boolean, 
        item: {columns: Array<*>}, 
        index: ?number, 
        section?: any
      }>},
    ){
  };

  _pressItem (item) {
    this.setState({
      editorAccountInfo: {...item},
      modalEditorVisible: true,
    });
  };

  _setAddAccountInfo(accountInfo) {
    let _info = Object.assign({}, this.state.addAccountInfo, accountInfo);
    this.setState({
      addAccountInfo: _info,
    });
  }
  _setEditorAccountInfo(accountInfo) {
    let _info = Object.assign({}, this.state.editorAccountInfo, accountInfo);
    this.setState({
      editorAccountInfo: _info,
    });
  }

  _btnSurePressed() {
    if (this.state.addAccountInfo.company === '') {
      Toast.toastLong('公司名称不能为空!');
    } else if (this.state.addAccountInfo.account === '') {
      Toast.toastLong('账号不能为空!');
    } else if (this.state.addAccountInfo.password === '') {
      Toast.toastLong('密码不能为空!');
    } else {
      const {accountAdd} = this.props;
      accountAdd(this.state.addAccountInfo)
      this.setState({
        modalVisible: false,
        addAccountInfo: {id:0, account:'', company: '', password:''}
      });
    }
  }

  _btnCancelPressed() {
    this.setState({
      modalVisible: false,
      modalEditorVisible: false,
    });
  }

  _btnEditorCancelPressed() {
    this.setState({
      modalVisible: false,
      modalEditorVisible: false,
    });
  }

  _btnEditorDeletePressed() {
    let {accountDelete} = this.props;
    accountDelete(this.state.editorAccountInfo);
    this.setState({
      modalVisible: false,
      modalEditorVisible: false,
    });
  }

  _btnEditorUpdatePressed() {
    if (this.state.editorAccountInfo.company === '') {
      Toast.toastLong('公司名称不能为空!');
    } else if (this.state.editorAccountInfo.account === '') {
      Toast.toastLong('账号不能为空!');
    } else if (this.state.editorAccountInfo.password === '') {
      Toast.toastLong('密码不能为空!');
    } else {
      let {accountUpdate} = this.props;
      accountUpdate(this.state.editorAccountInfo);
      this.setState({
        modalVisible: false,
        modalEditorVisible: false,
        editorAccountInfo: {}
      });
    }
  }

  render(){
    let data = this._initData(this.props.app.accountInfoList);
    let header = this._renderHeader();
    return(
      <View style={styles.Root}>
        <Image source={IMG_BG} style={styles.BackgroundImage} />
        {header}
        <SectionList
          enableVirtualization={true}
          onRefresh={() => alert('onRefresh: nothing to refresh :P')}
          onViewableItemsChanged={this._onViewableItemsChanged.bind(this)}
          refreshing={false}
          renderItem={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          keyExtractor={(item, index) => item.id}
          sections={data}
          viewabilityConfig={{
            minimumViewTime: 3000,
            viewAreaCoveragePercentThreshold: 100,
            waitForInteraction: true,
          }}
        />
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
          >
         <View style={styles.ModalRoot}>
          <View style={styles.ModalInputContainer}>
            <View style={styles.AccountInputContainer}>
              <Icon name="info" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                onChangeText={(text) => {this.setAddAccountInfo({company:text})}}
                value={this.state.addAccountInfo.company}
                keyboardType={'email-address'}
                placeholder={TEXT_COMPANY_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.AccountInputContainer}>
              <Icon name="user" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                onChangeText={(text) => {this.setAddAccountInfo({account:text})}}
                value={this.state.addAccountInfo.account}
                keyboardType={'email-address'}
                placeholder={TEXT_ACCOUNT_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.AccountInputContainer}>
              <Icon name="key" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                onChangeText={(text) => {this.setAddAccountInfo({password:text})}}
                value={this.state.addAccountInfo.password}
                keyboardType={'email-address'}
                placeholder={TEXT_PASSWORD_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.ModalBottomContainer}>
              <Button
                style={[styles.AccountBtnContainer, styles.AccountSureBtn]}
                text={"添加"}
                textStyle={styles.AccountBtnText}
                underlayColor={styles.AccountSureBtn.backgroundColor}
                onPress={this._btnSurePressed.bind(this)}
                />
              <Button
                style={[styles.AccountBtnContainer, styles.AccountCancelBtn]}
                text={"取消"}
                textStyle={styles.AccountBtnText}
                underlayColor={styles.AccountCancelBtn.backgroundColor}
                onPress={this._btnCancelPressed.bind(this)}
                />
            </View>
          </View>
         </View>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalEditorVisible}
          onRequestClose={() => {
            this.setState({
              modalEditorVisible: false,
            });
          }}
          >
         <View style={styles.ModalRoot}>
          <View style={styles.ModalInputContainer}>
            <View style={styles.AccountInputContainer}>
              <Icon name="info" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                editable={false}
                onChangeText={(text) => {this.setEditorAccountInfo({company:text})}}
                value={this.state.editorAccountInfo.company}
                keyboardType={'email-address'}
                placeholder={TEXT_COMPANY_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.AccountInputContainer}>
              <Icon name="user" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                onChangeText={(text) => {this.setEditorAccountInfo({account:text})}}
                value={this.state.editorAccountInfo.account}
                keyboardType={'email-address'}
                placeholder={TEXT_ACCOUNT_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.AccountInputContainer}>
              <Icon name="key" style={styles.AccountLabel} />
              <TextInput
                style={styles.AccountInput}
                onChangeText={(text) => {this.setEditorAccountInfo({password:text})}}
                value={this.state.editorAccountInfo.password}
                keyboardType={'email-address'}
                placeholder={TEXT_PASSWORD_PLACEHOLDER}
                placeholderTextColor={'#aaa'}
                underlineColorAndroid={"transparent"}
                maxLength={20}
              />
            </View>
            <View style={styles.ModalBottomContainer}>
              <Button
                style={[styles.AccountBtnContainer, styles.AccountSureBtn]}
                text={"确定"}
                textStyle={styles.AccountBtnText}
                underlayColor={styles.AccountSureBtn.backgroundColor}
                onPress={this._btnEditorUpdatePressed.bind(this)}
                />
              <Button
                style={[styles.AccountBtnContainer, styles.AccountDeleteBtn]}
                text={"删除"}
                textStyle={styles.AccountBtnText}
                underlayColor={styles.AccountDeleteBtn.backgroundColor}
                onPress={this._btnEditorDeletePressed.bind(this)}
                />
              <Button
                style={[styles.AccountBtnContainer, styles.AccountCancelBtn]}
                text={"取消"}
                textStyle={styles.AccountBtnText}
                underlayColor={styles.AccountCancelBtn.backgroundColor}
                onPress={this._btnEditorCancelPressed.bind(this)}
                />
            </View>
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleCreater((baseStyle) => {
  return {
    Root: {
      ...baseStyle.ContainerColumn,
      flex:1,
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
    HeaderContainer: {
      ...baseStyle.ContainerColumn,
      width: '100%',
      height: Device.px2RN(100),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e9ac39aa',
      borderBottomWidth: Device.px2RN(1),
      borderColor: '#00000077'
    },
    HeaderTitle: {
      fontSize: Device.fontSize2RN(50),
      color: 'white',
      fontWeight: '700'
    },
    HeaderAccountAdd: {
      position: 'absolute',
      right: Device.px2RN(15),
      top: Device.px2RN(10)
    },
    SectionTitleContainer: {
      ...baseStyle.ContainerRow,
      width: Device.size.width,
      height: Device.px2RN(80),
      alignItems: 'center',
      backgroundColor: '#cc3399cc'
    },
    SectionTitleText: {
      fontSize: Device.fontSize2RN(40),
      color: 'white',
      fontWeight: '300'
    },
    SectionTitleArrow: {
      width: Device.px2RN(40),
      fontSize: Device.fontSize2RN(50),
      color: 'white',
      fontWeight: '400'
    },
    SectionItemContainer: {
      ...baseStyle.ContainerRow,
      width: Device.size.width,
      height: Device.px2RN(80),
      alignItems: 'center',
      paddingLeft: Device.px2RN(40),
      backgroundColor: '#333333cc',
      marginBottom: 2,
    },
    SectionItemText: {
      fontSize: Device.fontSize2RN(30),
      color: 'white',
      fontWeight: '200'
    },


    ModalRoot: {
      ...baseStyle.ContainerColumn,
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor:'#00000099'
    },
    ModalInputContainer: {
      ...baseStyle.ContainerColumn,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: Device.px2RN(400),
      height: Device.px2RN(450),
      padding:Device.px2RN(10),
      paddingBottom: 0,
      borderRadius: Device.px2RN(10),
      backgroundColor:'#ffffffcc'
    },
    AccountInputContainer: {
      ...baseStyle.ContainerRow,
      width: Device.px2RN(320),
      height: Device.px2RN(70),
      alignItems: 'flex-end',
      marginTop: Device.px2RN(10),
      borderBottomWidth: Device.px2RN(1),
      borderColor: '#3b85e8dd',
    },
    AccountLabel: {
      flex:1,
      fontSize: Device.fontSize2RN(30),
      color: '#333',
      textAlign: 'left',
      marginLeft: Device.px2RN(10),
      marginBottom: Device.px2RN(10)
    },
    AccountInput: {
      width: Device.px2RN(280),
      height:Device.px2RN(50),
      fontSize: Device.fontSize2RN(30),
      padding:0,
      paddingLeft: Device.px2RN(5),
      paddingRight: Device.px2RN(5),
      color: '#333',
    },
    ModalBottomContainer: {
      ...baseStyle.ContainerColumn,
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    AccountBtnContainer: {
      width: Device.px2RN(400),
      height:Device.px2RN(60),
      justifyContent: 'center',
      alignItems: 'center'
    },
    AccountSureBtn: {
      backgroundColor: '#3b85e8',
    },
    AccountDeleteBtn: {
      backgroundColor: 'red',
    },
    AccountCancelBtn: {
      borderBottomLeftRadius: Device.px2RN(10),
      borderBottomRightRadius: Device.px2RN(10),
      backgroundColor: '#fabd6c',
    },
    AccountBtnText: {
      fontSize: Device.fontSize2RN(25),
      color: '#fff',
    }
  }
});

export default connect(
  state => ({
    app: state.app
  }),
  (dispatch) => {
    return bindActionCreators({
      getAllAccountList: Actions.getAllAccountList,
      accountAdd: Actions.accountAdd,
      accountDelete: Actions.accountDelete,
      accountUpdate: Actions.accountUpdate
    }, dispatch);
  }
)(MainScene);