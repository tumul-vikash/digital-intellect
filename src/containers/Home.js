import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput 
} from 'react-native';
import { inject, observer } from "mobx-react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { text, updateText, textLength } = this.props.store;
    return (
      <View style={[styles.container]}>
        <TextInput 
          style={styles.input}
          onChangeText={updateText}
        />
        <Text>{text}</Text>
        <Text>Length: {textLength}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default inject("store")(observer(Home));
