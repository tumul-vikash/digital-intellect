import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ActivityIndicator
          size="5"
          animating={this.props.visibility}
          color="#EE5E1B"
        />
        <Text style={styles.text}>
          {this.props.loaderText ? this.props.loaderText : null}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    margin: 7,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  text: {
    color: 'teal',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});
