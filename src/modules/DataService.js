'use strict';

import MockService from './MockService';

let _instance = null;

class DataService {
  constructor() {
    if (_instance === null) {
      _instance = this;
    }

    return _instance;
  }

  login(user) {
    return MockService.login(user);
  }

  getAllAccountList(user) {
    return MockService.getAllAccountList(user);
  }

  accountAdd(accountInfo) {
    return MockService.accountAdd(accountInfo);
  }

  accountUpdate(accountInfo) {
    return MockService.accountUpdate(accountInfo);
  }

  accountDelete(accountInfo) {
    return MockService.accountDelete(accountInfo);
  }
}

module.exports = new DataService();