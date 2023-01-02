// @ts-nocheck

export class StateKeeper {

  // all states are held within a store

  stateStore = {
  /* 
    view: [
      { page: "dashboard", params: {} }
    ]
  */
  };

  constructor() {}

  importStore(store) {
    this.stateStore = store;
    return this.stateStore;
  }

  createStore(stateStoreName:string) {
    if(this.stateStore[stateStoreName]) throw new Error("Store name already exists");
    else this.stateStore[stateStoreName] = [];
    return this.stateStore[stateStoreName];
  }
  
  createStoreState(stateStoreName:string, state:any) {
    if(!this.stateStore[stateStoreName]) throw new Error("Store doesn't exist");
    else this.stateStore[stateStoreName].push(state);
    return this.stateStore[stateStoreName][0];
  }

  getStoreState(stateStoreName:string) {
    if(!this.stateStore[stateStoreName]) throw new Error("Store doesn't exist");
    return this.stateStore[stateStoreName][0];
  }
  
  getStoreStateHistory(stateStoreName:string, startIndex:number, lastIndex:number) {
    if(!this.stateStore[stateStoreName]) throw new Error("Store doesn't exist");
    const _lastIndex = lastIndex >= this.stateStore[stateStoreName].length ? this.stateStore[stateStoreName].length : lastIndex;
    return this.stateStore[stateStoreName].slice(startIndex, _lastIndex);
  }

  exportStore() {
    return this.stateStore;
  }
  
}

