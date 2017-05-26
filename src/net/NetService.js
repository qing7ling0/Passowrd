'use strict';

import React, { Component, PropTypes } from 'react';
import NetRequest from './NetRequest';
import * as Config from '../constants/Config';
import * as HLogUtil from '../utils/HLogUtil.js';
import * as Constants from '../constants/Constants';
import {
  DeviceEventEmitter,
} from 'react-native';

export const REQ_GET_COURSE_TYPE_LIST       = 'course/type_list';
export const REQ_GET_COURSE_LIST            = 'course/lists';
export const REQ_GET_ALL_CLASS_LIST         = 'class/lists';
export const REQ_GET_CLASS_STUDENT_LIST     = 'class/student';
export const REQ_ADD_STUDENT_FLOWER         = 'thumb/add';
export const REQ_RANK_FLOWER                = 'thumb/rank';
export const REQ_CLASS_FEEDBACK             = 'class/feedback';
export const REQ_APP_UPDATE                 = 'apps/update';

export const REQ_LOGIN                      = 'login';
export const REQ_CONFIG                     = 'config';
export const REQ_GET_ALL_ACCOUNT_LIST       = 'account/lists';
export const REQ_ADD_ACCOUNT                = 'account/add';
export const REQ_GET_ALL_STUDENT_LIST       = 'student/alllist';
export const REQ_STUDENT_SIGN               = 'student/sign';
export const REQ_GET_CLASS_STUDENT_SIGN_LIST= 'class/sign_student_list';


export const Status = {
  success               : 0,  // 成功
  err_error             : -1, // 数据错误
  err_account_exist     : -2, // 账号已存在
  err_ac_pd_null        : -3, // 账号密码不能为空
  err_no_permission     : -4, // 权限不足
  err_ac_pd_error       : -5, // 账号密码错误
  err_not_exist         : -6, // 不存在
}

/**
* 返回[result]格式
* status  : 返回状态
* data    : 返回的数据
* msg     : 返回信息
*/

/**
* 请求的[packet]格式
* req     : 请求路径
* data    : 请求的数据
* callback  : 请求的回调
*/

class NetService extends Component {
  
  static TOKEN = null;

  static createDefaultPacket() {
    let packet = {};
    packet.req = '';
    packet.type = Constants.URL_REQ_TYPE.get;
    packet.data = [];
    packet.token = NetService.TOKEN;
    packet.callback = null;

    return packet;
  }
  
  static getServerAddress() {
    return Config.ConfigServerAddress;
  }

  static resend() {

  }

  static sendPacket(packet, callback) {

    NetService.showWaiting()
    HLogUtil.log(' NetService req=' + packet.req + '; data=' + JSON.stringify(packet.data));

    if (packet.type === Constants.URL_REQ_TYPE.postJson) {

      return NetRequest.postJson(NetService.getServerAddress()+packet.req, packet.data, packet.token)
                    .then((data)=>{
                      HLogUtil.log(' NetService res=' + packet.req + '; data=' + data);
                      let jd = JSON.parse(data);
                      NetService.receivePacket(jd, packet);
                      return jd;
                    })
                    .catch((error) => {
                      HLogUtil.error(' NetService res=' + packet.req + '; error' + error);
                      let data = {status:-1, message:'网络错误'};
                      NetService.receivePacket(data, packet);
                      return data;
                    });
    } else if (packet.type === Constants.URL_REQ_TYPE.get) {
      let req = '';
      for(let key in packet.data) {
        req += req.length > 0 ? '&' : '?';
        req += key + '=' + packet.data[key];
      }
      req = packet.req + req;
      // 请求数据的网络层提示
      return NetRequest.get(NetService.getServerAddress()+req, packet.token)
                    .then((data) => {
                      HLogUtil.log(' NetService res=' + packet.req + '; data=' + data);
                      let jd = JSON.parse(data);
                      NetService.receivePacket(jd, packet);
                      return jd;
                    })
                    .catch((error) => {
                      HLogUtil.error(' NetService res=' + packet.req + '; error' + error);
                      let data = {status:-1, message:'网络错误'};
                      NetService.receivePacket(data, packet);
                      return data;
                    });
    }
  }

  static receivePacket(result, reqPacket) {
    if (result.status === -1) {
      // 网络连接失败，点击重新加载
      //  区分网络断开，还是 数据返回错误
      NetService.hideWaiting(result.message);
    }
    else
    {
      NetService.hideWaiting('数据获取成功');
    }
  }

  static showWaiting() {
      // 请求数据的网络层提示
      // AppInstance().LoadingState({
      //   isShow:true,
      //   AcIndicShow:true,
      //   text:'数据加载中',
      // });
  }

  static hideWaiting(msg) {
      // AppInstance().LoadingState({
      //   isShow:false,
      //   AcIndicShow:false,
      //   text:msg,
      // });
  }

  // 请求所有  课程类型列表
  static reqCourseTypeList() {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_GET_COURSE_TYPE_LIST;
    return NetService.sendPacket(packet);
  }

  //请求 某一课程的 详细数据
  static reqCourseList(Id) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_GET_COURSE_LIST;
    packet.data = {course_type_id: Id};
    return NetService.sendPacket(packet);
  }

  //请求 所有班级列表
  static reqClassList() {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_GET_ALL_CLASS_LIST;
    return NetService.sendPacket(packet);
  }

  //请求 某一班级的 详细数据
  static reqClassStudentData(Id) {
    let packet = NetService.createDefaultPacket();
    // packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.req = REQ_GET_CLASS_STUDENT_LIST;
    packet.data = {classId: Id};
    return NetService.sendPacket(packet);
  }

  // 请求 排行帮 数据 
  static reqRankList(classId) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_RANK_FLOWER;
    packet.data = {class_id: classId};
    return NetService.sendPacket(packet);
  }

  //提交小红花数量
  static reqAddFlowr(datad) {
    let data = {
      class_time:'2007-12-07',
      list: [
        {student_id:20, student_name:'学习', course_type_id:1, course_type_name:'语文', course_id:10, course_name:'语文课1', thumb_count:10},
        {student_id:21, student_name:'学习2', course_type_id:1, course_type_name:'语文', course_id:10, course_name:'语文课1', thumb_count:12},
        {student_id:19, student_name:'学习3', course_type_id:1, course_type_name:'语文', course_id:10, course_name:'语文课1', thumb_count:13},
        {student_id:18, student_name:'学习4', course_type_id:1, course_type_name:'语文', course_id:10, course_name:'语文课1', thumb_count:14}
      ]
    }
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_ADD_STUDENT_FLOWER;
    packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.data = datad;
    return NetService.sendPacket(packet);
  }

  //提交课堂反馈
  static reqAddFeedBack(data) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_CLASS_FEEDBACK;
    packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.data = data;
    return NetService.sendPacket(packet);
  }

  static reqAppUpdate(version) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_APP_UPDATE;
    packet.data = {appVersion:version};
    return NetService.sendPacket(packet);
  }

  static reqLogin(account, password) {
    NetService.TOKEN = null;
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_LOGIN;
    packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.data = {account:account, password:password};
    return NetService.sendPacket(packet).then((data) =>{
      if (data.status === 0) {
        NetService.TOKEN = data.data.UserData.token;
      }
      return data;
    });
  }

  static reqGetAccountList() {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_GET_ALL_ACCOUNT_LIST;
    return NetService.sendPacket(packet);
  }

  // 添加子账号
  // data:{account,password,account_type,class_id,power}
  //
  static reqAddAccount(data) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_ADD_ACCOUNT;
    packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.data = data;
    return NetService.sendPacket(packet);
  }

  static reqConfig() {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_CONFIG;
    return NetService.sendPacket(packet);
  }

  static reqGetStudentList() {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_GET_ALL_STUDENT_LIST;
    return NetService.sendPacket(packet);
  }

  // 学生入园签到
  // data:{student_id, class_id, health, remark}
  //
  static reqStudentSign(data) {
    let packet = NetService.createDefaultPacket();
    packet.req = REQ_STUDENT_SIGN;
    packet.type = Constants.URL_REQ_TYPE.postJson;
    packet.data = data;
    return NetService.sendPacket(packet);
  }
}


module.exports = NetService;