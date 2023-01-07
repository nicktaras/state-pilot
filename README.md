# state-driver

This library can be used to manage and subscribe to changes in your applications state.

Key features:

- event history
- store subscriptions
- custom event triggers
- for use with any framwork or library

# dev

npm run build - build the ts file

npm run test  - test the logic

# usage

Adding State Driver into your application

````javascript
  import { StateDriver } from 'state-driver';
````

Create a new store inside your application.

````javascript
  // @param String stateStoreName declare a name for your store
  // @param Boolean useHistory will keep record of changes
  // @returns new store
  stateDriver.createStore(stateStoreName, useHistory);
````

Add a new state to a store.

````javascript 
  // @params string stateStoreName store
  // @params object state data 
  // @returns new store state
  stateDriver.createStoreState(stateStoreName, state);
````

Get a stores most recent state.

````javascript 
  // @returns currrent store state
  stateDriver.getStoreState();
````

get a stores state history from a range of past events.

````javascript 
  // @params string stateStoreName
  // @params number startIndex
  // @params number lastIndex
  // @returns store state history from range
  stateDriver.getStoreStateHistory(stateStoreName, startIndex, lastIndex);
````

get a stores entire state history.

````javascript 
  // @params string stateStoreName
  // @returns all store state history
  stateDriver.getAllStoreStateHistory(stateStoreName);
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

unsubscribe from a store subscription variable instance.

````javascript
  // @description unsubscribe from single subscription
  unSubUserSettings();
````

unsubscribe from an entire store.

````javascript 
  // @description unsubscribe all subscriptions from a store
  stateDriver.unsubscribe('userSettings');
````

example use of library

````javascript

  import { StateDriver } from 'state-driver';

  // create new instance of StateDriver
  const stateDriver = new StateDriver();
  
  // create stores
  stateDriver.createStore('userSettings', true);
  stateDriver.createStore('viewNavigation', true);

  // add a view state
  stateDriver.createStoreState('viewNavigation', { path: '/home', name: 'home' });
  
  // add a user settings state
  stateDriver.createStoreState('userSettings', { darkMode: true });

  // create a store action
  stateDriver.createAction('TOGGLE_DARK_MODE', 'userSettings', 'darkMode', false, function(s) { return !s });
  
  // add some subscriptions to listen for changes
  const unSubscribeUserSettings = stateDriver.unsubscribe('userSettings', data => { /* do something with data */ });
  const unSubscribeVieNavigation = stateDriver.unsubscribe('viewNavigation', data => { /* do something with data */ }););

  // invoke direct state changes to be recieved by subscribers
  stateDriver.createStoreState('viewNavigation', { path: '/contact', name: 'contact' });
  
  // invoke state change via actions to be recieved by subscribers
  stateDriver.actions.TOGGLE_DARK_MODE(stateDriver.getStoreState('userSettings').darkMode);

````






