/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import Loader from '../utils/Loader';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      showLoader: false,
    };
  }

  componentDidMount() {
    this.setState({showLoader: true});
    firestore()
      .collection('learnerProfiles')
      .where('phone', '==', this.props.homeStore.phone)
      .get()
      .then((data) => {
        console.log(data.docs[0].data());
        this.props.homeStore.updateUserDetails(data.docs[0].data());
        this.setState({showLoader: false});
      });
  }

  render() {
    const {userDetails} = this.props.homeStore;
    return (
      <ScrollView style={[styles.container]}>
        {userDetails ? (
          <>
            <View style={styles.top}>
              <TouchableHighlight
                onPress={() => alert('change image')}
                underlayColor="none"
                style={styles.imgButton}>
                <Icon
                  name="md-person-circle-outline"
                  size={100}
                  color="#EE5E1B"
                />
              </TouchableHighlight>
              <Text style={styles.heading}>{userDetails.username}</Text>
              <Text style={styles.normal}>{userDetails.email}</Text>
              <Text style={styles.normal}>{userDetails.phone}</Text>
            </View>
            <View style={styles.mid}>
              <View style={styles.layout}>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>About</Text>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Actions.edit({uid: userDetails.uid})}
                    style={styles.editBtn}>
                    <Text
                      style={[
                        styles.sectionText,
                        {color: '#EE5E1B', fontWeight: 'bold'},
                      ]}>
                      Edit
                    </Text>
                  </TouchableHighlight>
                </View>
                <Text style={[styles.normal, {marginLeft: 4}]}>
                  {userDetails.about ? userDetails.about : 'none'}
                </Text>
              </View>
              <View style={styles.layout}>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Interests</Text>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Actions.edit({uid: userDetails.uid})}
                    style={styles.editBtn}>
                    <Text
                      style={[
                        styles.sectionText,
                        {color: '#EE5E1B', fontWeight: 'bold'},
                      ]}>
                      Edit
                    </Text>
                  </TouchableHighlight>
                </View>
                <Text style={[styles.normal, {marginLeft: 4}]}>
                  {userDetails.interests
                    ? userDetails.interests.join()
                    : 'none'}
                </Text>
              </View>
              <View style={styles.layout}>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Skills</Text>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => Actions.edit({uid: userDetails.uid})}
                    style={styles.editBtn}>
                    <Text
                      style={[
                        styles.sectionText,
                        {color: '#EE5E1B', fontWeight: 'bold'},
                      ]}>
                      Edit
                    </Text>
                  </TouchableHighlight>
                </View>
                <Text style={[styles.normal, {marginLeft: 4}]}>
                  {userDetails.skills ? userDetails.skills.join() : 'none'}
                </Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <CustomButton
                underlayColor="none"
                label="Become a teacher"
                btnStyle={{
                  borderWidth: 1.5,
                  borderColor: 'teal',
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginHorizontal: 5,
                  marginTop: 4,
                }}
                labelStyle={{color: 'teal'}}
                onPress={() => Actions.addTeacher()}
              />
              <CustomButton
                underlayColor="none"
                label="Logout"
                btnStyle={{
                  borderWidth: 1.5,
                  borderColor: 'teal',
                  backgroundColor: 'teal',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginHorizontal: 5,
                  marginTop: 4,
                }}
                labelStyle={{color: '#fff'}}
                onPress={() => {
                  AsyncStorage.removeItem('phone');
                  Actions.login();
                }}
              />
            </View>
          </>
        ) : (
          <Loader
            style={{backgroundColor: '#fff'}}
            visibility={this.state.showLoader}
            size="1"
            loaderText="Loading"
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flex: 4,
    alignItems: 'center',
  },
  imgButton: {
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#ECECEC',
  },
  heading: {
    color: 'teal',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: 5,
  },
  normal: {
    color: '#EE5E1B',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    marginTop: 5,
  },
  mid: {
    flex: 4,
  },
  layout: {
    //borderWidth: 1.5,
    margin: 5,
    borderRadius: 5,
    elevation: 3,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'teal',
  },
  sectionText: {
    color: '#fff',
    fontSize: 18,
  },
  editBtn: {
    backgroundColor: '#fff',
    padding: 5,
  },
  bottom: {
    flex: 3,
  },
});

export default inject('homeStore')(observer(Profile));
