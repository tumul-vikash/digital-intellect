import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react';

class ArrowNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableHighlight
            onPress={() => Actions.home()}
            underlayColor="none">
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableHighlight>
        </View>
        <View style={styles.middle}>
          <Text style={styles.text}>Digital Intellect</Text>
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
    margin: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

export default inject('utilityStore', 'store')(observer(ArrowNav));
