/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

export default class MultilineInput extends Component {
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
          outlineColor="teal"
          underlineColor="teal"
          selectionColor="teal"
          style={[
            {
              backgroundColor: '#fff',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              height: 100,
            },
            this.props.style,
          ]}
          theme={this.props.theme}
          multiline={true}
        />
        <HelperText type="error" visible={this.props.visible}>
          Required
        </HelperText>
      </View>
    );
  }
}
