# state-keeper

A simple State Container for any application type. This library can be used to manage application state for views and logic with history.

# dev

npm run build - build the ts file
npm run test  - test the logic

# usage

Create a new store inside your application.

````javascript

  // @param Object PreviousState a previous store state exported from the store.
  const myNewStore = new StateBridge(previousState);

````

This library requires stores to be made per type of state collection. For example, you may wish to keep track of the view state of your app along with user settings.

````javascript
  
  // @param String stateStoreName declare a name for your store
  // @returns new store
  myNewStore.createStore(stateStoreName);

````

````javascript 
  
  // @params string stateStoreName store
  // @params object state data 
  // @returns new store state
  myNewStore.createStoreState(stateStoreName:string, state:any);

````

````javascript 
  
  // @returns currrent store state
  myNewStore.getStoreState();

````

````javascript 
  
  // @params string stateStoreName
  // @params number startIndex
  // @params number lastIndex
  // @returns store state history from range
  myNewStore.getStoreStateHistory(stateStoreName:string, startIndex:number, lastIndex:number);

````

````javascript 
  
  // @params string stateStoreName
  // @returns all store state history
  myNewStore.getAllStoreStateHistory(stateStoreName:string);

````

````javascript 
  
  // @params object store provide a valid store object from previous session
  // @returns object store
  myNewStore.importStore(store);

````

````javascript 
  
  // @returns object store
  myNewStore.exportStore();
  
````

// const unsub1 = PubSub.subscribe('spacex', data => console.log('Falcon was launched', data));
// const unsub2 = PubSub.subscribe('spacex', data => console.log('Falcon Heavy was launched', data));
// PubSub.publish('spacex', 'some data slash params')
// // Unsubscribe single subscription
// unsub1(); // Unsubscribes Falcon
// unsub2(); // Unsubscribes Falcon Heavy
// // Unsubscribe ALL subscriptions for a topic
// PubSub.unsubscribe('spacex')


