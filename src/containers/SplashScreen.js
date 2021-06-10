import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image 
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
      setTimeout(() => {
        Actions.tabScreen();
      }, 3000);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Image
          style={styles.image} 
          source={require('../assets/images/Logo2.png')}
        />
        <Text style={[styles.text, {
          color: 'teal'
        }]}>
          DIGITAL INTELLECT
        </Text>
        <Text style={[styles.text, {
          color: '#EE5E1B',
          textAlign: 'right', 
          fontSize: 22,
          fontWeight: 'normal',
          fontFamily: 'CinderelaPersonalUseRegular-RDvM',
          width: '70%',
          marginTop: 5, 
        }]}>A better way of learning..</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: 120,
      height: 120,
      margin: 7
    },
    text: {
      fontSize: 27,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    }
});
