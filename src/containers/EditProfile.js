/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {inject, observer} from 'mobx-react';
import firestore from '@react-native-firebase/firestore';

import MultilineInput from '../utils/MultilineInput';
import CustomButton from '../utils/CustomButton';
import Loader from '../utils/Loader';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: null,
      interests: null,
      skills: null,
      showLoader: false,
    };
  }

  editProfile = async () => {
    const data = await firestore()
      .collection('learnerProfiles')
      .where('uid', '==', this.props.uid)
      .get();
    await firestore()
      .collection('learnerProfiles')
      .doc(data.docs[0].id)
      .update({
        about: this.props.homeStore.userDetails.about,
        interests: this.props.homeStore.userDetails.interests,
        skills: this.props.homeStore.userDetails.skills,
      })
      .then(() => Actions.profile());
  };

  render() {
    const {userDetails, updateAbout, updateInterests, updateSkills} =
      this.props.homeStore;
    return (
      <ScrollView style={styles.container}>
        <MultilineInput
          label="About us"
          placeholder="Write something about you"
          visible={false}
          value={userDetails.about}
          onChangeText={(about) => {
            updateAbout(about);
          }}
          theme={{colors: {text: '#252525', primary: 'teal'}}}
        />
        <MultilineInput
          label="Interests"
          placeholder="eg. Trading, Technology (separate by comma(,))"
          visible={false}
          value={userDetails.interests ? userDetails.interests.join() : null}
          onChangeText={(interests) => {
            updateInterests(interests.split(','));
          }}
          theme={{colors: {text: '#252525', primary: 'teal'}}}
        />
        <MultilineInput
          label="Skills"
          placeholder="eg. Singing, Dancing, Programming (separate by comma(,))"
          visible={false}
          value={userDetails.skills ? userDetails.skills.join() : null}
          onChangeText={(skills) => {
            updateSkills(skills.split(','));
          }}
          theme={{colors: {text: '#252525', primary: 'teal'}}}
        />
        {this.state.showLoader ? (
          <Loader
            style={{backgroundColor: '#fff'}}
            visibility={this.state.showLoader}
            size="1"
            loaderText="Loading"
          />
        ) : (
          <CustomButton
            underlayColor="none"
            label="Save"
            btnStyle={{
              backgroundColor: 'teal',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 4,
            }}
            labelStyle={{color: '#fff'}}
            onPress={() => {
              this.setState({showLoader: true});
              this.editProfile();
            }}
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default inject('homeStore')(observer(EditProfile));
