
export class StateDriver {
  subIds: number;
  subscriptions: {};
  stateStore: {};
  actions: object;
  
  // all states are held within a store
  
  constructor(previousState:any) {
    this.subIds = 0;
    this.subscriptions = {};
    this.actions = {};
    if(previousState) {
      this.stateStore = previousState;  
    } else {
      this.stateStore = {
        /*
          view: [
            { useHistory: true/false, state: [{ page: "dashboard", params: {} }], past: [{ page: "dashboard", params: {} }] }
          ]
        */
      };
    }
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

  private throwErrorCheck(errorArgIsTrue, message:string) {
    if(errorArgIsTrue) throw new Error(message);
  }

  // create a new store e.g. 'userSettings'
  public createStore(storeName:string, useHistory=false) {
    this.throwErrorCheck(this.stateStore[storeName], "Store name already exists");
    this.stateStore[storeName] = { useHistory, state: [], past: [] };
    return this.eventHandler('createStore', storeName, this.stateStore[storeName].state);
  }
  
  // create a new store state e.g. 'userSettings', [{ darkMode: true, theme: 'fresh', lang: 'en-us' }]
  // using any data structure(s) format required per store.
  public createStoreState(storeName:string, state:any) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    if(this.stateStore[storeName].useHistory === false) {
      this.stateStore[storeName].state = [state];
    } else {
      this.stateStore[storeName].state.push(state);
      this.stateStore[storeName].past.push(state);
    }
    return this.eventHandler('createStoreState', storeName, this.stateStore[storeName].state[this.stateStore[storeName].state.length-1]);
  }

  // actions can be created to handle sub store states
  public createAction(actionName, store, subStoreKey, isAsync, fn) {
    this.throwErrorCheck(this.actions[actionName], "Action already exists");
    if(isAsync) {
      const _fn = async (newState) => {
        const currState = this.getStoreState(store);
        let nextState = currState;
        nextState[subStoreKey] = await fn(newState);
        return this.createStoreState(store, nextState);
      }
      this.actions[actionName] = _fn.bind(this);
    } else {
      const _fn = (newState) => {
        let nextState = Object.assign({}, this.getStoreState(store));
        nextState[subStoreKey] = fn(newState);
        return this.createStoreState(store, nextState);
      }
      this.actions[actionName] = _fn.bind(this);
    }
  }

  // get a previous state from a store. This could be used to allow a user to navigate through 
  // events they have triggered e.g. purchase details, moves made in a game (to create an action replay etc)
  // if a previous index is out of range, the length will be given.
  public getPreviousState(storeName:string, previousIndex:any) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    const _previousIndex = previousIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : previousIndex;
    return this.stateStore[storeName].state[_previousIndex];
  }
    
  public applyPreviousState(storeName:string) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    this.stateStore[storeName].state.push(this.stateStore[storeName].state[this.stateStore[storeName].past.length-2]);
    this.stateStore[storeName].past.pop();
    return this.eventHandler('getPreviousState', storeName, this.stateStore[storeName].past[this.stateStore[storeName].past.length-1]);
  }

  // get most recent stores state
  public getStoreState(storeName:string) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    return this.stateStore[storeName].state[this.stateStore[storeName].state.length-1];
  }

  // get all of a store states
  public getAllStoreStateHistory(storeName) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    return this.stateStore[storeName].state.slice(0, this.stateStore[storeName].state.length);
  }
  
  // get a selection of states from a store
  public getStoreStateHistory(storeName:string, startIndex:number, lastIndex:number) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    const _lastIndex = lastIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : lastIndex;
    return this.stateStore[storeName].state.slice(startIndex, _lastIndex);
  }

  // subscribe to a store
  public subscribe (topic, fn) {
    if(!this.subscriptions[topic]) this.subscriptions[topic] = {}
    const token = ++this.subIds;
    this.subscriptions[topic][token] = fn;
    return () => this.unsubscribe(topic, token)
  }

  // unsubscibe from a store
  public unsubscribe (topic, token) {
    if(!token) delete this.subscriptions[topic];
    this.subscriptions[topic] && (delete this.subscriptions[topic][token]);
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





