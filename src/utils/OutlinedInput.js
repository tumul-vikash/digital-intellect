/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

export default class OutlinedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TextInput
          label={this.props.label}
          mode="outlined"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={(text) => this.props.onChangeText(text)}
          outlineColor={
            this.props.outlineColor ? this.props.outlineColor : 'teal'
          }
          underlineColor={
            this.props.underlineColor ? this.props.underlineColor : 'teal'
          }
          selectionColor={
            this.props.outlineColor ? this.props.selectionColor : 'teal'
          }
          style={[
            {
              backgroundColor: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
              height: 50,
            },
            this.props.style,
          ]}
          theme={this.props.theme}
        />
        <HelperText type="error" visible={this.props.visible}>
          Required
        </HelperText>
      </View>
    );
  }
}
