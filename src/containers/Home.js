/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';

import PostForm from '../utils/PostForm';
import Loader from '../utils/Loader';
import ModalLoader from '../utils/ModalLoader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoaderModal: false,
      update: false,
    };
  }

  componentDidMount() {
    this.setState({showLoaderModal: true});
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((doc) => {
          var data = doc.doc.data();
          data.id = doc.doc.id;
          this.props.homeStore.insertPost(data);
        });
        this.setState({showLoaderModal: false});
      });
  }

  render() {
    const {showPostUpdateLoader, posts} = this.props.homeStore;
    return (
      <View style={[styles.container]}>
        <ScrollView style={styles.main}>
          <PostForm />
          {showPostUpdateLoader ? (
            <Loader
              visibility={showPostUpdateLoader}
              loaderText="updating post"
            />
          ) : null}
          <ModalLoader visible={this.state.showLoaderModal} text="Loading" />
          {posts.map((post, index) => {
            if (post.type == 'question') {
              return (
                <View key={index} style={styles.queryContainer}>
                  <Text
                    style={[styles.text, {fontWeight: 'bold', color: 'teal'}]}>
                    {post.question}
                  </Text>
                  <View style={styles.extra}>
                    <Text
                      style={[styles.text, {fontSize: 15, color: '#EE5E1B'}]}>
                      {post.username ? post.username : 'anonymous'}
                      {' . '}
                    </Text>
                    <TouchableHighlight
                      style={{
                        backgroundColor: 'teal',
                        padding: 3,
                        borderRadius: 3,
                      }}>
                      <Text
                        style={[styles.text, {fontSize: 13, color: '#fff'}]}>
                        Follow
                      </Text>
                    </TouchableHighlight>
                    <Text
                      style={[styles.text, {fontSize: 15, color: '#EE5E1B'}]}>
                      {' '}
                      {post.createdAt.toDate().toDateString()}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={7}
                    style={[
                      styles.text,
                      {color: '#000', fontSize: 16, marginVertical: 10},
                    ]}>
                    {post.description}
                  </Text>
                  <View style={styles.icons}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="star-o" size={20} color="teal" />
                      <Text style={{color: '#EE5E1B'}}> 2 stars</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="comment-o" size={20} color="teal" />
                      <Text style={{color: '#EE5E1B'}}> 3 Answers</Text>
                    </View>
                    <Icon name="share" size={20} color="teal" />
                    <Icon name="share-alt" size={20} color="teal" />
                    <Icon name="ellipsis-v" size={20} color="#000" />
                  </View>
                </View>
              );
            } else if (post.type == 'post') {
              return (
                <View key={index} style={styles.queryContainer}>
                  <Text
                    style={[styles.text, {fontWeight: 'bold', color: 'teal'}]}>
                    {post.topic}
                  </Text>
                  <View style={styles.extra}>
                    <Text
                      style={[styles.text, {fontSize: 15, color: '#EE5E1B'}]}>
                      {post.username ? post.username : 'anonymous'}
                      {' . '}
                    </Text>
                    <TouchableHighlight
                      style={{
                        backgroundColor: 'teal',
                        padding: 3,
                        borderRadius: 3,
                      }}>
                      <Text
                        style={[styles.text, {fontSize: 13, color: '#fff'}]}>
                        Follow
                      </Text>
                    </TouchableHighlight>
                    <Text
                      style={[styles.text, {fontSize: 15, color: '#EE5E1B'}]}>
                      {' '}
                      {post.createdAt.toDate().toDateString()}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={7}
                    style={[
                      styles.text,
                      {color: '#000', fontSize: 16, marginVertical: 10},
                    ]}>
                    {post.post}
                  </Text>
                  <View style={styles.icons}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="star-o" size={20} color="teal" />
                      <Text style={{color: '#EE5E1B'}}> 2 stars</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="comment-o" size={20} color="teal" />
                      <Text style={{color: '#EE5E1B'}}> 3 comments</Text>
                    </View>
                    <Icon name="share" size={20} color="teal" />
                    <Icon name="share-alt" size={20} color="teal" />
                    <Icon name="ellipsis-v" size={20} color="#000" />
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  queryContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
    padding: 5,
  },
  extra: {
    paddingBottom: 5,
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ECECEC',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  icons: {
    padding: 7,
    borderTopWidth: 1.5,
    borderTopColor: '#ECECEC',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default inject('homeStore')(observer(Home));
