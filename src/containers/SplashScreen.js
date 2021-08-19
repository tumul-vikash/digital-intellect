/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';

import {getTeacherProfile, getUserProfile, login} from '../components/Login';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(async () => {
      const value = await AsyncStorage.getItem('phone');
      if (value) {
        this.props.homeStore.addPhone(value);
        Actions.home({phone: value});
        //get user profile
        const userData = await getUserProfile(value);
        this.props.homeStore.updateUserDetails(userData.docs[0].data());
        //get teacher profile
        const TeacherData = await getTeacherProfile(userData.docs[0].id);
        if (TeacherData.docs[0]) {
          this.props.homeStore.updateTeacherDetails(TeacherData.docs[0].data());
        }
      } else {
        Actions.login();
      }
    }, 3000);
  }

  render() {
    const {phone, addPhone} = this.props.homeStore;
    return (
      <View style={[styles.container]}>
        <Image
          style={styles.image}
          source={require('../assets/images/Logo2.png')}
        />
        <Text
          style={[
            styles.text,
            {
              color: 'teal',
            },
          ]}>
          DIGITAL INTELLECT
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: '#EE5E1B',
              textAlign: 'right',
              fontSize: 22,
              fontWeight: 'normal',
              fontFamily: 'CinderelaPersonalUseRegular-RDvM',
              width: '70%',
              marginTop: 5,
            },
          ]}>
          A better way of learning..
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    margin: 7,
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});

export default inject('authStore', 'homeStore')(observer(SplashScreen));
