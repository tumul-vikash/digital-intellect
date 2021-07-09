/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  ScrollView,
} from 'react-native';
import {inject, observer} from 'mobx-react';

import OutlinedInput from './OutlinedInput';
import MultilineInput from './MultilineInput';
import CustomButton from './CustomButton';
import BackButton from './BackButton';

import {updatePost} from '../components/Home';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showPostForm: false,
      question: null,
      qhvisible: false,
      description: null,
      dhvisible: false,
      topic: null,
      thvisible: false,
      post: null,
      phvisible: false,
      type: 'question',
    };
  }

  render() {
    const {togglePostUpdateLoader} = this.props.homeStore;
    return (
      <View>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => this.setState({showModal: true})}>
          <View style={styles.form}>
            <Text style={styles.text}>Write / Ask</Text>
          </View>
        </TouchableHighlight>
        <Modal visible={this.state.showModal}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.header,
                {
                  backgroundColor: '#ECECEC',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 7,
                },
              ]}>
              <BackButton
                color="teal"
                buttonStyle={{}}
                onpress={() => this.setState({showModal: false})}
              />
              <Text style={[styles.text, {color: 'teal'}]}>CREATE POST</Text>
              <CustomButton
                underlayColor="none"
                btnStyle={{backgroundColor: '#ECECEC'}}
                onPress={() => {
                  let post = null;
                  if (this.state.type == 'question') {
                    post = {
                      type: this.state.type,
                      question: this.state.question,
                      description: this.state.description,
                      createdAt: new Date(),
                    };
                  } else if (this.state.type == 'post') {
                    post = {
                      type: this.state.type,
                      topic: this.state.topic,
                      post: this.state.post,
                      createdAt: new Date(),
                    };
                  }
                  togglePostUpdateLoader(true);
                  this.setState({showModal: false});
                  updatePost(post).then(() => togglePostUpdateLoader(false));
                }}
                label="POST"
              />
            </View>
            <View
              style={[
                styles.header,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                },
              ]}>
              <CustomButton
                underlayColor="none"
                btnStyle={{
                  backgroundColor: '#EE5E1B',
                  padding: 7,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
                labelStyle={{color: '#fff', fontSize: 18}}
                onPress={() => {
                  this.setState({showPostForm: false, type: 'question'});
                }}
                label="Ask a doubt?"
              />
              <CustomButton
                underlayColor="none"
                btnStyle={{
                  backgroundColor: '#EE5E1B',
                  padding: 7,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
                labelStyle={{color: '#fff', fontSize: 18}}
                onPress={() => {
                  this.setState({showPostForm: true, type: 'post'});
                }}
                label="Write your thoughts"
              />
            </View>
            <View style={[styles.main]}>
              {this.state.showPostForm ? (
                <>
                  <OutlinedInput
                    label="Topic"
                    placeholder="Topic name"
                    visible={this.state.thvisible}
                    value={this.state.topic}
                    onChangeText={(topic) =>
                      this.setState({topic: topic}, () => {
                        if (
                          this.state.topic == null ||
                          this.state.topic.length == 0 ||
                          this.state.topic == ''
                        ) {
                          this.setState({thvisible: true});
                        } else {
                          this.setState({thvisible: false});
                        }
                      })
                    }
                    theme={{colors: {text: '#252525', primary: 'teal'}}}
                  />
                  <MultilineInput
                    label="Post"
                    placeholder="your thoughts here"
                    visible={this.state.phvisible}
                    value={this.state.post}
                    onChangeText={(post) =>
                      this.setState({post: post}, () => {
                        if (
                          this.state.post == null ||
                          this.state.post.length == 0 ||
                          this.state.post == ''
                        ) {
                          this.setState({phvisible: true});
                        } else {
                          this.setState({phvisible: false});
                        }
                      })
                    }
                    style={{height: 200}}
                    theme={{colors: {text: '#252525', primary: 'teal'}}}
                  />
                </>
              ) : (
                <>
                  <OutlinedInput
                    label="Question"
                    placeholder="your question?"
                    visible={this.state.qhvisible}
                    value={this.state.question}
                    onChangeText={(question) =>
                      this.setState({question: question}, () => {
                        if (
                          this.state.question == null ||
                          this.state.question.length == 0 ||
                          this.state.question == ''
                        ) {
                          this.setState({qhvisible: true});
                        } else {
                          this.setState({qhvisible: false});
                        }
                      })
                    }
                    theme={{colors: {text: '#252525', primary: 'teal'}}}
                  />
                  <MultilineInput
                    label="Description"
                    placeholder="Describe your query"
                    visible={this.state.dhvisible}
                    value={this.state.description}
                    onChangeText={(description) =>
                      this.setState({description: description}, () => {
                        if (
                          this.state.description == null ||
                          this.state.description.length == 0 ||
                          this.state.description == ''
                        ) {
                          this.setState({dhvisible: true});
                        } else {
                          this.setState({dhvisible: false});
                        }
                      })
                    }
                    style={{height: 300}}
                    theme={{colors: {text: '#252525', primary: 'teal'}}}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'teal',
    margin: 4,
    padding: 7,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
  },
  header: {
    flex: 0.1,
  },
  main: {
    flex: 1,
    padding: 7,
  },
});

export default inject('homeStore')(observer(PostForm));
