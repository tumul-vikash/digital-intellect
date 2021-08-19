/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import firestore from '@react-native-firebase/firestore';

import OutlinedInput from '../utils/OutlinedInput';
import CustomButton from '../utils/CustomButton';

class AddTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressLine1: null,
      addressLine2: null,
      city: null,
      state: null,
      Country: 'India',
      profession: null,
      expertise: null,
    };
  }

  registerTeacher = async (uid) => {
    if (
      this.state.addressLine1 &&
      this.state.addressLine2 &&
      this.state.city &&
      this.state.state &&
      this.state.profession &&
      this.state.expertise
    ) {
      this.props.homeStore.updateTeacherDetails({
        uid: uid,
        line1: this.state.addressLine1,
        line2: this.state.addressLine2,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        profession: this.state.profession,
        expertise: this.state.expertise,
        status: 'not approved',
      });
      const data = await firestore().collection('teacherProfiles').add({
        uid: uid,
        line1: this.state.addressLine1,
        line2: this.state.addressLine2,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        profession: this.state.profession,
        expertise: this.state.expertise,
        status: 'not approved',
      });

      await firestore()
        .collection('teacherProfiles')
        .doc(data.docs[0].id)
        .update({tid: data.docs[0].id});

      await firestore().collection('users').doc(uid).update({type: 'teacher'});
    }
  };

  render() {
    const {userDetails} = this.props.homeStore;
    return (
      <ScrollView style={styles.container}>
        <OutlinedInput
          label="Address"
          placeholder="address line 1"
          visible={this.state.helperVisibility}
          value={this.state.addressLine1}
          onChangeText={(addressLine1) =>
            this.setState({addressLine1: addressLine1}, () => {
              if (
                this.state.addressLine1 == null ||
                this.state.addressLine1.length == 0 ||
                this.state.addressLine1 == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <OutlinedInput
          label=""
          placeholder="address line 2(optional)"
          visible={this.state.helperVisibility}
          value={this.state.addressLine2}
          onChangeText={(addressLine2) =>
            this.setState({addressLine2: addressLine2}, () => {
              if (
                this.state.addressLine2 == null ||
                this.state.addressLine2.length == 0 ||
                this.state.addressLine2 == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <OutlinedInput
          label=""
          placeholder="city"
          visible={this.state.helperVisibility}
          value={this.state.city}
          onChangeText={(city) =>
            this.setState({city: city}, () => {
              if (
                this.state.city == null ||
                this.state.city.length == 0 ||
                this.state.city == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <OutlinedInput
          label=""
          placeholder="state"
          visible={this.state.helperVisibility}
          value={this.state.state}
          onChangeText={(state) =>
            this.setState({state: state}, () => {
              if (
                this.state.state == null ||
                this.state.state.length == 0 ||
                this.state.state == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <OutlinedInput
          label="Profession"
          placeholder="where do you work?"
          visible={this.state.helperVisibility}
          value={this.state.profession}
          onChangeText={(profession) =>
            this.setState({profession: profession}, () => {
              if (
                this.state.profession == null ||
                this.state.profession.length == 0 ||
                this.state.profession == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <OutlinedInput
          label="Expertise"
          placeholder="You domain of teaching?"
          visible={this.state.helperVisibility}
          value={this.state.expertise}
          onChangeText={(expertise) =>
            this.setState({expertise: expertise}, () => {
              if (
                this.state.expertise == null ||
                this.state.expertise.length == 0 ||
                this.state.expertise == ''
              ) {
                this.setState({helperVisibility: true});
              } else {
                this.setState({helperVisibility: false});
              }
            })
          }
          theme={{colors: {text: '#EE5E1B', primary: 'teal'}}}
        />
        <CustomButton
          underlayColor="none"
          label="Add me"
          btnStyle={{
            borderWidth: 1.5,
            borderColor: 'teal',
            backgroundColor: 'teal',
            alignItems: 'center',
            borderRadius: 5,
            marginTop: 4,
          }}
          labelStyle={{color: '#fff'}}
          onPress={() => this.registerTeacher(userDetails.uid)}
        />
        <Text style={styles.text}>
          By registering, you agree to our terms and conditions
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default inject('authStore', 'homeStore')(observer(AddTeacher));
