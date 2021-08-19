/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {getLiveCourseDetails} from '../components/LiveCourses';

export default class LiveCourseDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseDetails: null,
    };
  }

  componentDidMount() {
    getLiveCourseDetails(this.props.courseId).then((data) =>
      this.setState({courseDetails: data.data()}, () =>
        console.log(this.state.courseDetails),
      ),
    );
  }

  render() {
    const {courseDetails} = this.state;
    return (
      <ScrollView style={styles.container}>
        {this.state.courseDetails && (
          <View>
            <View
              style={[styles.title, {backgroundColor: courseDetails.color}]}>
              <Text
                style={[
                  styles.titleText,
                  courseDetails.color == '#fff' ? {color: '#000'} : null,
                ]}>
                {courseDetails.topic}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={[styles.descriptionText, {color: 'teal'}]}>
                {courseDetails.description}
              </Text>
              <Text style={[styles.descriptionText, {color: '#000'}]}>
                created by: {courseDetails.username}
              </Text>
              <Text style={[styles.descriptionText, {color: '#EE5E1B'}]}>
                Scheduled date: {courseDetails.date.toDate().toDateString()}
              </Text>
              <Text style={[styles.descriptionText, {color: '#EE5E1B'}]}>
                Scheduled time:{' '}
                {courseDetails.time.toDate().toLocaleTimeString()}
              </Text>
            </View>
          </View>
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
  title: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Black',
  },
  description: {
    margin: 7,
  },
  descriptionText: {
    textAlign: 'justify',
    fontSize: 18,
    marginVertical: 10,
  },
});
