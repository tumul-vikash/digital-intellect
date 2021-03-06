import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {updateText} = this.props.store;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableHighlight onPress={() => updateText()} underlayColor="none">
            <Icon name="bars" size={25} color="#fff" />
          </TouchableHighlight>
        </View>
        <View style={styles.middle}>
          <Text style={styles.text}>Digital Intellect</Text>
        </View>
        <View style={styles.right}>
          <TouchableHighlight
            onPress={() => {
              Actions.search();
            }}
            underlayColor="none">
            <Icon name="search" size={25} color="#fff" />
          </TouchableHighlight>
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
    elevation: 7,
  },
  left: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
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
  right: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default inject('utilityStore', 'store')(observer(Navbar));
