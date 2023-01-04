
export class StateDriver {
  subIds: number;
  subscriptions: {};
  stateStore: {};

  // all states are held within a store

  constructor() {
    this.subIds = 0;
    this.subscriptions = {}
    this.stateStore = {
      /* 
        view: [
          { page: "dashboard", params: {} }
        ]
      */
    };
  }

  // import a previously exported store
  public importStore(store) {
    this.stateStore = store;
    return this.stateStore;
  }

  // export store
  public exportStore() {
    return this.stateStore;
  }

  // create a new store e.g. 'userSettings'
  public createStore(storeName:string, useHistory:boolean) {
    if(this.stateStore[storeName]) {
      throw new Error("Store name already exists");
    } 
    this.stateStore[storeName] = { useHistory: useHistory === true ? true : false, state: [] };
    return this.eventHandler('createStore', storeName, this.stateStore[storeName].state);
  }
  
  // create a new store state e.g. 'userSettings', [{ darkMode: true, theme: 'fresh', lang: 'en-us' }]
  // using any data structure(s) format required per store.
  public createStoreState(storeName:string, state:any) {
    if(!this.stateStore[storeName]){ 
      throw new Error("Store doesn't exist");
    }
    if(this.stateStore[storeName].useHistory === false) {
      this.stateStore[storeName].state = [state];
    } else {
      this.stateStore[storeName].state.unshift(state);
    }
    return this.eventHandler('createStoreState', storeName, this.stateStore[storeName].state[0]);
  }

  // get a previous state from a store. This could be used to allow a user to navigate through 
  // events they have triggered e.g. purchase details, moves made in a game (to create an action replay etc)
  // if a previous index is out of range, the length will be given.
  public getPreviousState(storeName:string, previousIndex:any) {
    if(!this.stateStore[storeName]){
      throw new Error("Store doesn't exist");
    } 
    const _previousIndex = previousIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : previousIndex;
    return this.eventHandler('getPreviousState', storeName, this.stateStore[storeName].state[_previousIndex]);
  }

  // get most recent stores state
  public getStoreState(storeName:string) {
    if(!this.stateStore[storeName]) throw new Error("Store doesn't exist");
    return this.eventHandler('getStoreState', storeName, this.stateStore[storeName].state[0]);
  }

  // get all of a store states
  public getAllStoreStateHistory(storeName) {
    if(!this.stateStore[storeName]) throw new Error("Store doesn't exist");
    return this.eventHandler('getAllStoreStateHistory', storeName, this.stateStore[storeName].state.slice(0, this.stateStore[storeName].state.length -1));
  }
  
  // get a selection of states from a store
  public getStoreStateHistory(storeName:string, startIndex:number, lastIndex:number) {
    if(!this.stateStore[storeName]) { throw new Error("Store doesn't exist"); }
    const _lastIndex = lastIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : lastIndex;
    return this.eventHandler('getStoreStateHistory', storeName, this.stateStore[storeName].state.slice(startIndex, _lastIndex));
  }

  // subscribe to a store
  public subscribe (topic, fn) {
    if(!this.subscriptions[topic]) this.subscriptions[topic] = {}
    const token = ++this.subIds;
    // Validate topic name and function
    this.subscriptions[topic][token] = fn;
    return () => this.unsubscribe(topic, token)
  }

  // unsubscibe from a store
  public unsubscribe (topic, token) {
    if(!token) delete this.subscriptions[topic]; // Delete all subscriptions for the topic
    this.subscriptions[topic] && (delete this.subscriptions[topic][token]); // Delete specific subscription
  }

  // publish event from a store
  private eventHandler(eventName:string, storeName:string, state:any) {
    this.publish(storeName, { storeName, eventName, state });
    return state;
  }

  // publish a new topic or update to store
  private publish (topic, ...args) {
    const subs = this.subscriptions[topic];
    if(!subs) { return false };
    Object.values(subs).forEach((sub:any) => sub(...args));
  }
  
}




