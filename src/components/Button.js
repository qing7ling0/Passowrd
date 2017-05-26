'use strict';
var React = require('react');
var ReactNative = require('react-native');

const {
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

const propTypes = {
  onPress: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  textStyle: Text.propTypes.style,
  style: View.propTypes.style,
  underlayColor: React.PropTypes.color,
  text: React.PropTypes.string,
  renderContainer: React.PropTypes.func,
};

export default class Button extends React.Component {
  constructor(){
    super();
  }

  render() {
    let container = null;
    if (this.props.children != null) {
      container = this.props.children;
    } else {
      container = (
        <Text style={this.props.textStyle}>
          {this.props.text}
        </Text>
      );
    }
    
    return(
      <TouchableHighlight
        style={this.props.style}
        underlayColor={this.props.underlayColor ? this.props.underlayColor : 'transparent'}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        {container}
      </TouchableHighlight>
    );
  }
}