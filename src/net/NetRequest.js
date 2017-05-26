'use strict';
import React, {Component} from 'react'


class NetRequest extends Component {

  static request(url, options) {
    return fetch(url, options)
        .then((response) => {
          return response.text();
        })
        .catch((error) => {
          console.log(error);
        });
    };

  /**
  *url :请求地址
  *data:参数(Json对象)
  */
  static postJson (url, data, token) {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (token) {
      headers['token'] = token;
    }
    var fetchOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };
    return NetRequest.request(url, fetchOptions);
  }

  //get请求
  /**
  *url :请求地址
  */
  static get(url, token) {
    let headers = {'Accept': 'application/json'};
    if (token) {
      headers['token'] = token;
    }

    var fetchOptions = {
      method: 'get',
      headers: headers
    };
    return NetRequest.request(url, fetchOptions);
  }
}

module.exports = NetRequest;