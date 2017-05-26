import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { NavigationActions } from 'react-navigation'

class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.back.bind(this);
        this.navigation  = this.props.navigation;
        console.log('BaseComponent constructor');
    }

    back() {
      const backAction = NavigationActions.back()
      this.navigation.dispatch(backAction)
    }
}

module.exports = BaseComponent;