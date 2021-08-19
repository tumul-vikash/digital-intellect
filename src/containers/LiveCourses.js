/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Modal,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

import LiveCourseCard from '../utils/LiveCourseCard';
import OutlinedInput from '../utils/OutlinedInput';
import MultilineInput from '../utils/MultilineInput';
import IconButton from '../utils/IconButton';
import Loader from '../utils/Loader';
import {createLiveCourse} from '../components/LiveCourses';

class LiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoaderModal: false,
      showModal: false,
      disabled: false,
      date: new Date(),
      time: new Date(),
      colors: [
        '#fff',
        '#C70039',
        '#FFC300',
        '#581845',
        ' #FF5733',
        '#779ecb',
        '#396394',
        '#808080',
        '#000',
      ],
      selectedColor: '#fff',
    };
  }

  componentDidMount() {
    firestore()
      .collection('liveCourses')
      .orderBy('date', 'asc')
      .onSnapshot((snapshot) => {
        if (snapshot) {
          snapshot.docChanges().forEach((doc) => {
            var data = doc.doc.data();
            if (
              data.date.toDate() > this.state.date ||
              data.date.toDate().toDateString() ==
                this.state.date.toDateString()
            ) {
              data.id = doc.doc.id;
              this.props.homeStore.insertLiveCourse(data);
            }
          });
        }
      });
  }

  getStatus = (ldate, status) => {
    if (ldate.toDate().toDateString() === this.state.date.toDateString()) {
      if (status == 0) {
        return {msg: 'Not yet started', color: '#EE5E1B'};
      } else if (status == 1) {
        return {msg: 'going on', color: 'teal'};
      }
    } else {
      return {msg: 'Starting soon', color: '#E75656'};
    }
  };

  render() {
    const {teacherDetails, userDetails, liveCourses} = this.props.homeStore;
    return (
      <ScrollView style={styles.container}>
        {teacherDetails && teacherDetails.status == 'approved' ? (
          <TouchableHighlight
            underlayColor="none"
            onPress={() => this.setState({showModal: true})}
            style={styles.btn}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
              }}>
              schedule a webinar
            </Text>
          </TouchableHighlight>
        ) : null}
        <View style={styles.cards}>
          {liveCourses.length > 0 &&
            liveCourses.map((course, index) => {
              return (
                <LiveCourseCard
                  key={index}
                  title={course.topic}
                  author={course.username}
                  date={course.date}
                  time={course.time}
                  description={course.description}
                  reviewCount={0}
                  starCount={0}
                  color={course.color}
                  courseId={course.id}
                  cuid={userDetails.uid}
                  teacherId={course.uid}
                  status={this.getStatus(course.date, course.status)}
                />
              );
            })}
          {liveCourses.length == 0 ? <Text>No available webinars</Text> : null}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          <View style={styles.modalContainer}>
            <OutlinedInput
              label="Topic"
              placeholder="course name"
              visible={this.state.helperVisibility}
              onChangeText={(courseName) =>
                this.setState({courseName: courseName}, () => {
                  if (
                    this.state.courseName == null ||
                    this.state.courseName.length == 0 ||
                    this.state.courseName == ''
                  ) {
                    this.setState({helperVisibility: true});
                  } else {
                    this.setState({helperVisibility: false});
                  }
                })
              }
              theme={{colors: {text: '#252525', primary: 'teal'}}}
            />
            <MultilineInput
              label="Description"
              placeholder="Describe in detail"
              visible={true}
              onChangeText={(description) =>
                this.setState({description: description}, () => {
                  if (
                    this.state.description == null ||
                    this.state.description.length == 0 ||
                    this.state.description == ''
                  ) {
                    this.setState({helperVisibility: true});
                  } else {
                    this.setState({helperVisibility: false});
                  }
                })
              }
              theme={{colors: {text: '#252525', primary: 'teal'}}}
            />
            <View style={styles.dateTime}>
              <IconButton
                onpress={() => this.setState({chooseDate: true})}
                iconName="calendar"
                color="teal"
                iconsize={30}
                buttonStyle={{alignSelf: 'center'}}
              />
              <Text style={styles.dateTimeText}>
                {this.state.date.toLocaleDateString()}
              </Text>
            </View>
            {this.state.chooseDate ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.date}
                mode="date"
                display="default"
                minimumDate={this.state.date}
                onChange={(x, date) => {
                  this.setState(
                    {chooseDate: false, date: new Date(date)},
                    () => {
                      if (this.state.date == 'Invalid Date') {
                        this.setState({date: new Date()});
                        alert('Date not selected');
                      }
                    },
                  );
                }}
              />
            ) : null}
            <View style={styles.dateTime}>
              <IconButton
                onpress={() => this.setState({chooseTime: true})}
                iconName="clock-o"
                color="teal"
                iconsize={30}
                buttonStyle={{alignSelf: 'center'}}
              />
              <Text style={styles.dateTimeText}>
                {this.state.time.toLocaleTimeString()}
              </Text>
            </View>
            {this.state.chooseTime ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.time}
                mode="time"
                display="default"
                onChange={(x, time) => {
                  this.setState(
                    {chooseTime: false, time: new Date(time)},
                    () => {
                      if (this.state.time == 'Invalid Date') {
                        this.setState({time: new Date()});
                        alert('Time not selected');
                      }
                    },
                  );
                }}
              />
            ) : null}
            <View style={styles.colors}>
              {this.state.colors.map((color, index) => {
                return (
                  <TouchableHighlight
                    underlayColor="none"
                    key={index}
                    onPress={() => {
                      this.setState({selectedColor: color});
                      console.log(color);
                    }}
                    style={[
                      styles.colorButton,
                      {backgroundColor: color},
                      this.state.selectedColor == color
                        ? {borderColor: '#EE5E1B'}
                        : {borderColor: 'teal'},
                    ]}>
                    <View />
                  </TouchableHighlight>
                );
              })}
            </View>
            {this.state.showLoaderModal ? (
              <Loader
                style={{backgroundColor: '#fff'}}
                visibility={this.state.showLoaderModal}
                size="1"
                loaderText="Updating"
              />
            ) : (
              <>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => {
                    if (this.state.courseName && this.state.description) {
                      this.setState({showLoaderModal: true});
                      createLiveCourse(
                        this.state.courseName,
                        this.state.description,
                        this.state.date,
                        this.state.time,
                        userDetails.uid,
                        userDetails.username,
                        teacherDetails.tid,
                        this.state.selectedColor,
                      ).then(() => {
                        alert('Webinar scheduled');
                        //console.log('course created');
                        this.setState({
                          showModal: false,
                          showLoaderModal: false,
                        });
                      });
                    }
                    console.log(this.state.courseName);
                  }}
                  style={[styles.btn, {alignItems: 'center'}]}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Schedule
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => this.setState({showModal: false})}
                  style={[
                    styles.btn,
                    {
                      alignItems: 'center',
                      borderWidth: 1.5,
                      borderColor: 'teal',
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <Text
                    style={{
                      color: 'teal',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Cancel
                  </Text>
                </TouchableHighlight>
              </>
            )}
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: 'teal',
    margin: 7,
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 7,
    backgroundColor: '#fff',
  },
  dateTime: {
    flexDirection: 'row',
  },
  dateTimeText: {
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#EE5E1B',
  },
  colors: {
    flex: 0.3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  colorButton: {
    borderWidth: 2,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
});

export default inject('authStore', 'homeStore')(observer(LiveCourses));
