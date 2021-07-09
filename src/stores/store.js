import {observable, action, makeObservable, computed} from 'mobx';

class store {
  text = 0;

  constructor() {
    makeObservable(this, {
      text: observable,
      updateText: action,
    });
  }

  updateText = () => {
    this.text = this.text + 1;
    console.log(this.text);
  };
}

export default new store();
