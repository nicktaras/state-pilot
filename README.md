# state-driver

This library can be used to manage application state for views and logic with history. It is minimal, small in size and made to enable the core requirements of managing state and subscribing to changes through callback functions.

Beyond the constructs of this library, stores can be initialised and managed however you require using any 
style of data structure(s) per store(s) with the option to keep history and read from it.

# dev

npm run build - build the ts file
npm run test  - test the logic

# usage

Create a new store inside your application.

````javascript

  // @param Object PreviousState a previous store state exported from the store.
  const stateDriver = new StateDriver(previousState);

````

This library requires stores to be made per type of state collection.

````javascript
  
  // @param String stateStoreName declare a name for your store
  // @param Boolean useHistory allows store history to be read
  // @returns new store
  stateDriver.createStore(stateStoreName, useHistory);

````

Add a new state to a store.

````javascript 
  
  // @params string stateStoreName store
  // @params object state data 
  // @returns new store state
  stateDriver.createStoreState(stateStoreName:string, state:any);

````

Get a stores most recent state.

````javascript 
  
  // @returns currrent store state
  stateDriver.getStoreState();

````

get a stores state history from a select number of events.

````javascript 
  
  // @params string stateStoreName
  // @params number startIndex
  // @params number lastIndex
  // @returns store state history from range
  stateDriver.getStoreStateHistory(stateStoreName:string, startIndex:number, lastIndex:number);

````

get an entre stores state history.

````javascript 
  
  // @params string stateStoreName
  // @returns all store state history
  stateDriver.getAllStoreStateHistory(stateStoreName:string);

````

import all stores (from a previously exported store).

````javascript 
  
  // @params object store provide a valid store object from previous session
  // @returns object store
  stateDriver.importStore(store);

````

export all stores.

````javascript 
  
  // @returns object store
  stateDriver.exportStore();
  
````

Subscribe to a store.

````javascript 
 
  const unSubUserSettings = stateDriver.subscribe('userSettings', data => console.log('darkMode has been set', data));

  // triggered event will be caught by the subscribers call back
  stateDriver.createStoreState('userSettings', { darkMode: true, lang: 'en-us' });
  
  
````

Unsubscribe from a store subscription instance.

````javascript
  
  // @description unsubscribe from single subscription
  unSubUserSettings();
  
````

Unsubscribe from an entire store.

````javascript 
  
  // @description unsubscribe from all store subscriptions
  stateDriver.unsubscribe('userSettings');
  
````




