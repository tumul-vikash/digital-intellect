/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react';

export class Navbar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, {elevation: 4}]}>
        <View style={[styles.left, {padding: 3}]}>
          <Image
            style={styles.logo}
            source={require('../assets/images/Logo2.png')}
          />
        </View>
        <View style={styles.middle}>
          <Text style={[styles.text, {fontFamily: 'Poppins-ExtraBold'}]}>
            Digital Intellect
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'teal',
    justifyContent: 'center',
  },
  left: {
    flex: 0.2,
    borderRadius: 50 / 2,
    margin: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
  },
  middle: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 35,
    marginLeft: 7,
    fontFamily: 'Poppins-Bold',
  },
});

export default inject('utilityStore', 'store')(observer(Navbar2));
