/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';

class LiveCourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      status: null,
      color: null,
      startDisabled: false,
      type: 'create',
    };
  }

  render() {
    const {teacherDetails, userDetails, liveCourses} = this.props.homeStore;
    return (
      <View>
        <View style={styles.card}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() =>
              Actions.lcDescription({courseId: this.props.courseId})
            }>
            <Text style={[styles.title]}>{this.props.title}</Text>
          </TouchableHighlight>
          <View style={styles.extra}>
            <Text style={styles.text}>{this.props.author}</Text>
            <Text style={styles.text}>
              {this.props.date.toDate().toDateString()}
            </Text>
            <Text style={styles.text}>
              {this.props.time.toDate().toLocaleTimeString()}
            </Text>
          </View>
          <View
            style={[
              styles.cardImage,
              this.props.color
                ? {backgroundColor: this.props.color}
                : {backgroundColor: 'teal'},
            ]}>
            <Text
              style={[
                styles.cardImageText,
                this.props.color == '#fff' ? {color: 'teal'} : {color: '#fff'},
              ]}>
              {this.props.title}
            </Text>
          </View>
          <Text numberOfLines={4} style={styles.description}>
            {this.props.description}
          </Text>
          <View style={styles.helpers}>
            <Text style={styles.helperText}>
              {this.props.reviewCount} reviews
            </Text>
            <Text style={styles.helperText}>{this.props.starCount} stars</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: this.props.status.color,
              }}>
              {this.props.status.msg}
            </Text>
            <TouchableHighlight
              style={{padding: 8}}
              underlayColor="none"
              onPress={() => this.setState({showMenu: true})}>
              <Icon name="ellipsis-v" size={20} color="#444" />
            </TouchableHighlight>
          </View>
        </View>
        <Modal transparent={true} visible={this.state.showMenu}>
          <View style={styles.modalContainer}>
            <View style={styles.menuContainer}>
              {this.props.cuid == this.props.teacherId ? (
                <>
                  <TouchableHighlight
                    underlayColor="none"
                    style={[
                      styles.modalBtn,
                      {alignItems: 'flex-start', backgroundColor: '#fff'},
                      this.props.status.msg == 'Starting soon'
                        ? {alignItems: 'flex-start', backgroundColor: '#fff'}
                        : {alignItems: 'flex-start', backgroundColor: '#fff'},
                    ]}
                    disabled={
                      this.props.status.msg == 'Starting soon' ? true : false
                    }
                    onPress={() =>
                      this.setState({showMenu: false, type: 'create'}, () => {
                        Actions.meetingRoom({
                          rId: this.props.courseId,
                          mType: this.state.type,
                        });
                      })
                    }>
                    <Text style={{color: '#EE5E1B', fontSize: 18}}>
                      Start Webinar
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="none"
                    style={[
                      styles.modalBtn,
                      {alignItems: 'flex-start', backgroundColor: '#fff'},
                    ]}
                    onPress={() => console.log('delete webinar')}>
                    <Text style={{color: '#EE5E1B', fontSize: 18}}>Delete</Text>
                  </TouchableHighlight>
                </>
              ) : (
                <>
                  <TouchableHighlight
                    underlayColor="none"
                    style={[
                      styles.modalBtn,
                      this.props.status.msg == 'Not yet started'
                        ? {alignItems: 'flex-start', backgroundColor: '#fff'}
                        : {alignItems: 'flex-start', backgroundColor: '#fff'},
                    ]}
                    disabled={
                      this.props.status.msg == 'Not yet started' ? true : false
                    }
                    onPress={() =>
                      this.setState({showMenu: false, type: 'join'}, () => {
                        Actions.meetingRoom({
                          rId: this.props.courseId,
                          mType: this.state.type,
                        });
                      })
                    }>
                    <Text style={{color: '#EE5E1B', fontSize: 18}}>Join</Text>
                  </TouchableHighlight>
                </>
              )}
            </View>
            <TouchableHighlight
              underlayColor="none"
              style={styles.modalBtn}
              onPress={() => this.setState({showMenu: false})}>
              <Text style={{color: '#fff', fontSize: 18}}>Close</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
  },
  card: {
    flexDirection: 'column',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 7,
    padding: 5,
  },
  title: {
    margin: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: 'teal',
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    color: '#EE5E1B',
    fontSize: 16,
    margin: 5,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '100%',
    height: 200,
    margin: 5,
  },
  description: {
    margin: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  helpers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    borderTopWidth: 1.5,
    borderTopColor: '#ECECEC',
  },
  helperText: {
    color: '#EE5E1B',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  cardImage: {
    height: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: 'red',
    backgroundColor: '#29292983',
    justifyContent: 'center',
  },
  modalBtn: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: 'teal',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
});

export default inject('authStore', 'homeStore')(observer(LiveCourseCard));
