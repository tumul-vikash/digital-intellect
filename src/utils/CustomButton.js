import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          onPress={() => this.props.onPress()}
          style={[styles.button, this.props.btnStyle]}>
          <Text style={[styles.text, this.props.labelStyle]}>
            {this.props.label ? this.props.label : 'label'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 7,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: 'teal',
  },
});
