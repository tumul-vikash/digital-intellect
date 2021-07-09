import {observable, action, makeObservable, computed} from 'mobx';

class homeStore {
  posts = [];
  showPostUpdateLoader = false;
  constructor() {
    makeObservable(this, {
      posts: observable,
      showPostUpdateLoader: observable,
      insertPost: action,
      togglePostUpdateLoader: action,
    });
  }

  insertPost = (data) => {
    this.posts.push(data);
  };

  togglePostUpdateLoader = (value) => {
    this.showPostUpdateLoader = value;
  };
}

export default new homeStore();
