import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          style={[styles.iconButton, this.props.buttonStyle]}
          onPress={() => this.props.onpress()}
          underlayColor="#C4C4C48A">
          <Icon
            style={[this.props.iconStyle]}
            name="angle-left"
            size={this.props.iconsize ? this.props.iconsize : 35}
            color={this.props.color ? this.props.color : '#fff'}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 40 / 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
