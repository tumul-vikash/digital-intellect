import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class LiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text> LiveCourses </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
