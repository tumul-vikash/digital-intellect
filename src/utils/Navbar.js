import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Digital Intellect </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'teal',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 35,
    marginLeft: 7,
    fontFamily: 'Poppins-Bold',
  },
});
