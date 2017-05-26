/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  DeviceEventEmitter,

} from 'react-native';
import  *  as Device  from '../constants/Device';

const propTypes = {
 text: PropTypes.string,
 AcIndicShow:true,
};

const LoadingView = ({text,AcIndicShow}) => (

  <View accessible={false} style={styles.loading}>
    {
      AcIndicShow ? <ActivityIndicator
        size="large"
        color="#3e9ce9"/>
      :null
    }
    <Text style={styles.loadingText}
      onPress={()=>{
        console.log("点击 "+{text});
      }}>
      {text}
    </Text>
  </View>
);

LoadingView.prototype = propTypes;

LoadingView.defaultProps = {
  text:'数据加载中...',
  AcIndicShow:true,
}

const styles = StyleSheet.create({

  loading: {
    position : 'absolute',
    bottom:Device.px2RN(384),
    left:Device.px2RN(512),
    zIndex:100,
  },

  loadingText: {
    alignSelf:'center',
    marginTop: Device.px2RN(10),
    textAlign: 'center',
  }
});

export default LoadingView;
