import { 
    observable, 
    action, 
    makeObservable, 
    computed 
} from "mobx";

class store {

    text = '';

    constructor() {
        makeObservable(this, {
            text: observable,
            updateText: action,
            textLength: computed
        })
    }
    
    updateText = (text) => {
        this.text = text;
    }

    get textLength() {
        return this.text.length;
    }
}

export default new store();
