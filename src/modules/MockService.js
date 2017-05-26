'use strict';

import * as Config from '../constants/Config';
import * as Constants from '../constants/Constants';
import * as CommonUtil from '../utils/CommonUtil';
import Storage from '../utils/Storage';


let _instance = null;

class MockService {
  constructor() {
    if (_instance === null) {
      _instance = this;

      this.initData();
    }


    return _instance;
  }

  async initData() {
    this.accountInfoList = [];
    this.user = '';
    this.accountMaxId = await this.getAccountMaxID();
  }

  login(user) {
    this.user = user;
    Storage.save(Constants.STORAGE_KEY_USER, user);
    return {user:user};
  }

  getAccountMaxID() {
    return Storage.get(Constants.STORAGE_KEY_MAX_ID).then((data) => {
      this.user = data;
      return data;
    });
  }

  getAllAccountList(user) {
    return Storage.get(Constants.STORAGE_KEY_USER+user).then((data) => {
      if (data) {
        this.accountInfoList = data;
      }
      return {list:this.accountInfoList};
    });
  }

  accountAdd(accountInfo) {
    let parentItem = null;
    this.accountInfoList.forEach((item,index)=>{
      if (item.company === accountInfo.company) {
        parentItem = item;
      }
    })
    this.accountMaxId = this.accountMaxId + 1;
    accountInfo.id = this.accountMaxId;
    if (!parentItem) {
      parentItem = {company:accountInfo.company, data:[]};
      parentItem.data.push({...accountInfo});
      this.accountInfoList.push(parentItem);
    } else {
    parentItem.data.push({...accountInfo});
    }

    Storage.save(Constants.STORAGE_KEY_MAX_ID, this.accountMaxId);
    Storage.save(Constants.STORAGE_KEY_USER+this.user, this.accountInfoList);
    return {success:true, list:this.accountInfoList}
  }

  accountUpdate(accountInfo) {
    let parentItem = null;
    this.accountInfoList.forEach((item,index)=>{
      if (item.company === accountInfo.company) {
        parentItem = item;
      }
    })
    if (parentItem) {
      let ind = -1;
      parentItem.data.forEach((item, index) => {
        if (item.id === accountInfo.id) {
          ind = index;
        }
      })
      if (ind !== -1) {
        parentItem.data[ind] = {...accountInfo};
        Storage.save(Constants.STORAGE_KEY_USER+this.user, this.accountInfoList);
        return {success:true, list:this.accountInfoList};
      }
    }

    return {success:false};
  }

  accountDelete(accountInfo) {
    let parentItem = null;
    let parentInd = -1;
    this.accountInfoList.forEach((item,index)=>{
      if (item.company === accountInfo.company) {
        parentItem = item;
        parentInd = index;
      }
    })
    if (parentItem) {
      let ind = -1;
      parentItem.data.forEach((item, index) => {
        if (item.id === accountInfo.id) {
          ind = index;
        }
      })
      if (ind !== -1) {
        parentItem.data.splice(ind, 1);
        if (parentItem.data.length === 0) {
          this.accountInfoList.splice(parentInd, 1);
        }

        Storage.save(Constants.STORAGE_KEY_USER+this.user, this.accountInfoList);
        return {success:true, list:this.accountInfoList};
      }
    }

    return {success:false};
  }

  accountEqual(a1, a2) {
    if (!a1 || !a2) return false;

    return (a1.company === a2.company && a1.account === a2.account && a1.password===a2.password && a1.id === a2.id);
  }
}

module.exports = new MockService();