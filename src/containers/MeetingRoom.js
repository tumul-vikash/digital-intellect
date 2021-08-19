/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import Peer from 'react-native-peerjs';
import {mediaDevices, RTCView} from 'react-native-webrtc';

import ModalLoader from '../utils/ModalLoader';
import IconButton from '../utils/IconButton';

class MeetingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      showModalLoader: false,
    };
  }

  componentDidMount() {
    const facingMode = 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
      },
    };
    mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        this.setState({localStream: stream});
        if (this.props.mType == 'create') {
          this.startMeeting(this.props.rId);
        } else if (this.props.mType == 'join') {
          this.joinMeeting(this.props.rId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startMeeting = async (id) => {
    var peer = new Peer();
    peer.on('open', async (pid) => {
      await firestore()
        .collection('liveCourses')
        .doc(id)
        .update({adminId: pid});
    });

    peer.on('connection', (conn) => {
      Alert.alert('New connection request', 'someone wants to join', [
        {
          text: 'Reject',
          onPress: () => conn.send('reject'),
          style: 'cancel',
        },
        {text: 'Accept', onPress: () => conn.send('accept')},
      ]);
    });

    peer.on('call', (call) => {
      call.on('stream', function (stream) {
        console.log(stream);
        this.prop.homeStore.insertRemoteStreams(stream);
      });
    });
  };

  joinMeeting = async (id) => {
    var peer = new Peer();
    const d = await firestore().collection('liveCourses').doc(id).get();
    const adminId = await d.data().adminId;
    if (!adminId) {
      alert('Meeting not yet started');
      Actions.live();
      return;
    }
    var conn = await peer.connect(adminId);
    conn.on('data', (data) => {
      if (data == 'accept') {
        this.createCall(peer, adminId);
      } else if (data == 'reject') {
        alert('You can not join this webinar');
        Actions.live();
      }
    });
  };

  createCall = (peer, adminId) => {
    const call = peer.call(adminId, this.state.localStream);
    call.on('stream', function (stream) {
      console.log(stream);
      this.prop.homeStore.updateRemoteStream(stream);
    });
  };

  render() {
    const {remoteStream, remoteStreamsAdmin} = this.props.homeStore;
    return (
      <View style={styles.container}>
        <View style={styles.screenShare}></View>
        <View style={styles.remoteVideoContainer}>
          {this.props.mType == 'join' ? (
            <>
              <View style={styles.stream}>
                {this.state.localStream && (
                  <RTCView
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    streamURL={this.state.localStream.toURL()}
                    objectFit="cover"
                    mirror={true}
                    zOrder={20}
                  />
                )}
              </View>
              <View style={styles.stream}>
                {remoteStream && (
                  <RTCView
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    streamURL={remoteStream.toURL()}
                    objectFit="cover"
                    mirror={true}
                    zOrder={20}
                  />
                )}
              </View>
            </>
          ) : (
            <>
              <View style={styles.stream}>
                {this.state.localStream && (
                  <RTCView
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    streamURL={this.state.localStream.toURL()}
                    objectFit="cover"
                    mirror={true}
                    zOrder={20}
                  />
                )}
              </View>
              {remoteStreamsAdmin.length > 0 &&
                remoteStreamsAdmin.map((stream, index) => {
                  stream && (
                    <View key={index} style={styles.stream}>
                      <RTCView
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        streamURL={stream.toURL()}
                        objectFit="cover"
                        mirror={true}
                        zOrder={20}
                      />
                    </View>
                  );
                })}
            </>
          )}
        </View>
        <View style={styles.buttons}>
          <IconButton
            onpress={() => console.log('google login')}
            iconName="desktop"
            iconsize={25}
            color="teal"
          />
          <IconButton
            onpress={() => console.log('github login')}
            iconName="phone"
            iconsize={25}
            color="teal"
          />
          <IconButton
            onpress={() => console.log('microsoft login')}
            iconName="ellipsis-v"
            iconsize={25}
            color="teal"
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
  },
  screenShare: {
    flex: 0.7,
    backgroundColor: '#6D6D6D',
  },
  remoteVideoContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  stream: {
    width: 150,
    height: '100%',
  },
  buttons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default inject('authStore', 'homeStore')(observer(MeetingRoom));
