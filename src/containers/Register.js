/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {inject, observer} from 'mobx-react';

import OutlinedInput from '../utils/OutlinedInput';
import CustomButton from '../utils/CustomButton';
import IconButton from '../utils/IconButton';
import Loader from '../utils/Loader';

import {addUser} from '../components/Register';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperVisibility: false,
      fullName: null,
      email: null,
      phone: null,
      showLoader: false,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <OutlinedInput
            label="Full Name"
            placeholder="Your full name here"
            visible={this.state.helperVisibility}
            value={this.state.fullName}
            onChangeText={(fullName) =>
              this.setState({fullName: fullName}, () => {
                if (
                  this.state.fullName == null ||
                  this.state.fullName.length == 0 ||
                  this.state.fullName == ''
                ) {
                  this.setState({helperVisibility: true});
                } else {
                  this.setState({helperVisibility: false});
                }
              })
            }
            theme={{colors: {text: '#252525', primary: 'teal'}}}
          />
          <OutlinedInput
            label="Email"
            placeholder="eg. someone@example.com"
            visible={this.state.helperVisibility}
            value={this.state.email}
            onChangeText={(email) =>
              this.setState({email: email}, () => {
                if (
                  this.state.email == null ||
                  this.state.email.length == 0 ||
                  this.state.email == ''
                ) {
                  this.setState({helperVisibility: true});
                } else {
                  this.setState({helperVisibility: false});
                }
              })
            }
            theme={{colors: {text: '#252525', primary: 'teal'}}}
          />
          <OutlinedInput
            label="Phone"
            placeholder="1234567890"
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
              label="Sign up"
              btnStyle={{
                backgroundColor: 'teal',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: 4,
              }}
              labelStyle={{color: '#fff'}}
              onPress={() => {
                if (
                  this.state.fullName &&
                  this.state.email &&
                  this.state.phone
                ) {
                  this.setState({showLoader: true});
                  addUser(
                    this.state.fullName,
                    this.state.email,
                    this.state.phone,
                  ).then((data) => {
                    this.setState({showLoader: false});
                    if (data == 'exists') {
                      alert(
                        'Email or Phone already exists. Please login to continue',
                      );
                    } else if (data == 'registered') {
                      alert(
                        'You are registered as learner. Please login to continue',
                      );
                      Actions.login();
                    }
                  });
                }
              }}
            />
          )}
          <IconButton
            onpress={() => Actions.login()}
            iconName="arrow-left"
            color="#EE5E1B"
            buttonStyle={{alignSelf: 'center'}}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    elevation: 3,
    borderRadius: 5,
    padding: 7,
    margin: 7,
    marginTop: 100,
  },
});

export default inject('authStore')(observer(Register));
