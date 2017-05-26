import React, { Component } from 'react';
var ReactNative, { StyleSheet } = require('react-native');

const BaseStyles = {
  Container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ContainerRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  ContainerColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column'
  }

}

export default StyleCreater = (creater) => StyleSheet.create(creater(BaseStyles));