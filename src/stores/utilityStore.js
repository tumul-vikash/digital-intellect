import {observable, action, makeObservable, computed} from 'mobx';

class utilityStore {
  showSearchBar = false;
  constructor() {
    makeObservable(this, {
      showSearchBar: observable,
      toggleSearchBar: action,
    });
  }

  toggleSearchBar = (data = false) => {
    this.showSearchBar = data;
    console.log(this.showSearchBar);
  };
}

export default new utilityStore();
