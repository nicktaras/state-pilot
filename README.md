# state-keeper

A simple State Container for any application type. This library can be used to manage application state for views and logic with or without history kept.

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
  // @returns currrent store state history
  myNewStore.getStoreStateHistory(stateStoreName:string, startIndex:number, lastIndex:number);

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


