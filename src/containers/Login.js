/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';

import CustomButton from '../utils/CustomButton';
import IconButton from '../utils/IconButton';
import OutlinedInput from '../utils/OutlinedInput';
import Loader from '../utils/Loader';

import {getTeacherProfile, getUserProfile, login} from '../components/Login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperVisibility: false,
      phone: null,
      showLoader: false,
    };
  }

  render() {
    const {phone, addPhone, updateTeacherDetails, updateUserDetails} =
      this.props.homeStore;
    return (
      <View style={[styles.container]}>
        <View style={styles.form}>
          <View style={styles.icons}>
            <IconButton
              onpress={() => console.log('google login')}
              iconName="google"
              color="#EE5E1B"
            />
            <IconButton
              onpress={() => console.log('github login')}
              iconName="github"
              color="#EE5E1B"
            />
            <IconButton
              onpress={() => console.log('microsoft login')}
              iconName="windows"
              color="#EE5E1B"
            />
          </View>
          <OutlinedInput
            label="Phone"
            placeholder="+91 1234567890"
            visible={this.state.helperVisibility}
            value={this.state.phone}
            onChangeText={(phone) =>
              this.setState({phone: phone}, () => {
                if (
                  this.state.phone == null ||
                  this.state.phone.length == 0 ||
                  this.state.phone == ''
                ) {
                  this.setState({helperVisibility: true});
                } else {
                  this.setState({helperVisibility: false});
                }
              })
            }
            theme={{colors: {text: '#252525', primary: 'teal'}}}
          />
          {this.state.showLoader ? (
            <Loader size="3" visibility={this.state.showLoader} />
          ) : (
            <CustomButton
              underlayColor="none"
              label="Sign in"
              btnStyle={{
                backgroundColor: 'teal',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: 2,
              }}
              onPress={() => {
                if (this.state.phone) {
                  login(this.state.phone).then(async (data) => {
                    if (data == 'notRegistered') {
                      alert('Not registered. Sign up to continue');
                    } else if (data == 'invalid') {
                      alert(
                        'Invalid details. Please contact our customer support',
                      );
                    } else {
                      addPhone(this.state.phone);
                      await AsyncStorage.setItem('phone', this.state.phone);
                      //get user profile
                      const userData = await getUserProfile(this.state.phone);
                      updateUserDetails(userData.docs[0].data());
                      console.log(userData);
                      //get teacher profile
                      const TeacherData = await getTeacherProfile(
                        userData.docs[0].id,
                      );
                      if (TeacherData.docs[0]) {
                        updateTeacherDetails(TeacherData.docs[0].data());
                      }
                      Actions.home({phone: this.state.phone});
                    }
                  });
                }
              }}
              labelStyle={{color: '#fff'}}
            />
          )}
          <CustomButton
            underlayColor="none"
            label="Sign up"
            btnStyle={{
              borderWidth: 1.5,
              borderColor: 'teal',
              backgroundColor: '#fff',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 4,
            }}
            labelStyle={{color: 'teal'}}
            onPress={() => Actions.register()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  icons: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  form: {
    elevation: 3,
    padding: 7,
    borderRadius: 5,
    margin: 7,
  },
});

export default inject('authStore', 'homeStore')(observer(Login));
