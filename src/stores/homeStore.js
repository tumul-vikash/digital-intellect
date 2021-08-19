import {observable, action, makeObservable, computed} from 'mobx';

class homeStore {
  posts = [];
  phone = null;
  userDetails = null;
  teacherDetails = null;
  liveCourses = [];
  showPostUpdateLoader = false;
  remoteStreamsAdmin = [];
  remoteStream = null;
  constructor() {
    makeObservable(this, {
      posts: observable,
      liveCourses: observable,
      showPostUpdateLoader: observable,
      phone: observable,
      userDetails: observable,
      teacherDetails: observable,
      remoteStreamsAdmin: observable,
      remoteStream: observable,
      insertRemoteStreams: action,
      updateRemoteStream: action,
      insertPost: action,
      insertLiveCourse: action,
      addPhone: action,
      updateUserDetails: action,
      updateAbout: action,
      updateInterests: action,
      updateSkills: action,
      updateTeacherDetails: action,
      togglePostUpdateLoader: action,
    });
  }

  insertRemoteStreams = (stream) => {
    this.remoteStreamsAdmin.push(stream);
  };

  updateRemoteStream = (stream) => {
    this.remoteStream = stream;
  };

  insertPost = (data) => {
    this.posts.push(data);
  };

  insertLiveCourse = (data) => {
    this.liveCourses.push(data);
  };

  addPhone = (phone) => {
    this.phone = phone;
  };

  updateUserDetails = (data) => {
    this.userDetails = data;
  };

  updateTeacherDetails = (data) => {
    this.teacherDetails = data;
  };

  updateAbout = (data) => {
    this.userDetails.about = data;
  };

  updateInterests = (interests) => {
    this.userDetails.interests = interests;
  };

  updateSkills = (skills) => {
    this.userDetails.skills = skills;
  };

  togglePostUpdateLoader = (value) => {
    this.showPostUpdateLoader = value;
  };
}

export default new homeStore();
