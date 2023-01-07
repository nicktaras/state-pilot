
export class StateDriver {
  subIds: number;
  subscriptions: {};
  stateStore: {};
  actions: object; // 89-118,132,149    
  
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

  public importStore(store) {
    this.stateStore = store;
    return this.stateStore;
  }

  public exportStore() {
    return this.stateStore;
  }

  private throwErrorCheck(errorArgIsTrue, message:string) {
    if(errorArgIsTrue) throw new Error(message);
  }

  public createStore(storeName:string, useHistory=false) {
    this.throwErrorCheck(this.stateStore[storeName], "Store name already exists");
    this.stateStore[storeName] = { useHistory, state: [], past: [] };
    return this.eventHandler('createStore', storeName, this.stateStore[storeName].state);
  }
  
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

  public getStoreState(storeName:string) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    return this.stateStore[storeName].state[this.stateStore[storeName].state.length-1];
  }

  public getAllStoreStateHistory(storeName) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    return this.stateStore[storeName].state.slice(0, this.stateStore[storeName].state.length);
  }
  
  public getStoreStateHistory(storeName:string, startIndex:number, lastIndex:number) {
    this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
    this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
    const _lastIndex = lastIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : lastIndex;
    return this.stateStore[storeName].state.slice(startIndex, _lastIndex);
  }

  public subscribe (store, callbackFn) {
    if(!this.subscriptions[store]) this.subscriptions[store] = {}
    const subId = ++this.subIds;
    this.subscriptions[store][subId] = callbackFn;
    return () => this.unsubscribe(store, subId);
  }

  public unsubscribe (store, subId) {
    if(!subId) delete this.subscriptions[store];
    this.subscriptions[store] && (delete this.subscriptions[store][subId]);
    return `unsubcribed from store ${store} with subscription id ${subId}`;
  }

  private eventHandler(eventName:string, storeName:string, state:any) {
    this.publish(storeName, { storeName, eventName, state });
    return state;
  }

  private publish (store, ...args) {
    const subs = this.subscriptions[store];
    if(!subs) { return false };
    Object.values(subs).forEach((sub:any) => {
      if(sub) sub(...args);
    });
  }

}





