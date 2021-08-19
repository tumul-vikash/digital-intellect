/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import Loader from '../utils/Loader';

export default class ModalLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Modal transparent={true} visible={this.props.visible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#DFDFDF8F',
            }}>
            <Loader
              visibility={this.props.visible}
              loaderText={this.props.text ? this.props.text : null}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
