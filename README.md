# state-driver

This library is minimal, small (10kb) and can be used to manage and subscribe to changes in your applications state.

Beyond the few methods this library provides, state stores can be initialised and managed using any 
style of data structure(s) with the option to keep history per store.

See this github repo's /examples of how this library can be used.

# dev

npm run build - build the ts file

npm run test  - test the logic

# usage

Create a new store inside your application.

````javascript
  // @param Object PreviousState a previous store state exported from the store.
  // @returns void
  const stateDriver = new StateDriver(previousState);
````

This library requires stores to be made per type of state collection.

````javascript
  // @param String stateStoreName declare a name for your store
  // @param Boolean useHistory allows store history to be read (default is false)
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

subscribe to a store.

````javascript 
  const unSubUserSettings = stateDriver.subscribe('userSettings', data => console.log('darkMode has been set', data));
  // triggered event will be caught by the subscribers call back
  stateDriver.createStoreState('userSettings', { darkMode: true, lang: 'en-us' });
````

create store action to provide for more descriptive state change triggers.

````javascript 
  // @params actionName String unique name of the action e.g. "DARK_MODE_TOGGLE"
  // @params store String store to update
  // @params subStoreKey String points to the sub state key you wish to update e.g. store['darkMode']
  // @params isAsync Boolean where actions can be sync or async
  // @params fn Function this is the custom function logic applied e.g. function(s) { return !s } will reverse a booleans the state
  // @returns void
  stateDriver.createAction(actionName, store, subStoreKey, isAsync, fn);
````

unsubscribe from a store subscription instance.

````javascript
  // @description unsubscribe from single subscription
  unSubUserSettings();
````

unsubscribe from an entire store.

````javascript 
  // @description unsubscribe from all store subscriptions
  stateDriver.unsubscribe('userSettings');
````

example

````javascript

  import { StateDriver } from 'state-driver';

  // create new instance of StateDriver
  const stateDriver = new StateDriver();
  
  // create some stores
  stateDriver.createStore('userSettings', true);
  stateDriver.createStore('viewNavigation', true);

  // add a view state
  stateDriver.createStoreState('viewNavigation', { path: '/home', name: 'home' });
  // add a settings state
  stateDriver.createStoreState('userSettings', { darkMode: true });
  
  // add some subscriptions to listen for changes
  const unSubscribeUserSettings = stateDriver.unsubscribe('userSettings', data => { /* do something with data */ });
  const unSubscribeVieNavigation = stateDriver.unsubscribe('viewNavigation', data => { /* do something with data */ }););

  // invoke state changes which will trigger the subscriptions
  stateDriver.createStoreState('userSettings', { darkMode: false });
  stateDriver.createStoreState('viewNavigation', { path: '/contact', name: 'contact' });

````

Please also see the unit tests for usage of the library.






