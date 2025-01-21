![Build Status](https://github.com/nicktaras/state-pilot/actions/workflows/ci.yml/badge.svg)

# state-pilot

State Pilot - a library designed to simplify state management in your JavaScript or TypeScript applications. With State Pilot, you can manage an application's lifecycle state, subscribe to changes in your data stores, and trigger custom named actions. 

The aim of this open source project is to create a highly flexible and reliable state management tool that delivers an intuitive interface for integration and ease of use. Contributions are welcome to this project.

## dev

build the ts file

`npm run build`

test the code

`npm run test`

## usage

Adding State Pilot into your application

````javascript
  import { StatePilot } from 'state-pilot';
````

Create a new store inside your application.

````javascript
  // @param string stateStoreName declare a name for your store
  // @param boolean useHistory (optional | defaults to false) will keep record of changes
  // @returns new store
  statePilot.createStore(stateStoreName, useHistory);
````

Add a new state to a store.

````javascript 
  // @params string stateStoreName store
  // @params object state data 
  // @returns new store state
  statePilot.createStoreState(stateStoreName, state);
````

Get a stores most recent state.

````javascript 
  // @returns currrent store state
  statePilot.getStoreState();
````

get a stores state history from a range of past events.

````javascript 
  // @params string stateStoreName
  // @params number startIndex
  // @params number lastIndex
  // @returns store state history from range
  statePilot.getStoreStateHistory(stateStoreName, startIndex, lastIndex);
````

get a stores entire state history.

````javascript 
  // @params string stateStoreName
  // @returns all store state history
  statePilot.getAllStoreStateHistory(stateStoreName);
````

import all stores (from a previously exported store).

````javascript 
  // @params object store provide a valid store object from previous session
  // @returns object store
  statePilot.importStore(store);
````

export all stores.

````javascript 
  // @returns object store
  statePilot.exportStore();
````

subscribe to a store.

````javascript 
  const unSubUserSettings = statePilot.subscribe('userSettings', data => console.log('user settings store updated', data));
  // triggered event will be caught by the subscribers call back
  statePilot.createStoreState('userSettings', { darkMode: true, lang: 'en-us' });
````

subscribe to a store and read from action data.

````javascript 
  statePilot.triggerStoreAction.SET_DARK_MODE(true);
  // action data can be found within the actionData of a call back
  const unSubUserSettings = statePilot.subscribe('userSettings', (state) => {
    if(state.storeAction === "SET_DARK_MODE") console.log(state.actionData)
  });
````

create store action to provide for more descriptive state change triggers.

````javascript 
  // @params string name unique name of the action e.g. "DARK_MODE_TOGGLE"
  // @params string store store to update
  // @params string subStoreKey points to the sub state key you wish to update e.g. store['darkMode']
  // @params Function fn this is the custom function logic applied e.g. function(s) { return !s } will reverse a booleans the state
  // @params boolean isAsync if the call back fn is async or not
  // @returns void
  statePilot.createStoreAction(name, store, subStoreKey, fn, isAsync);
````

create store actions as an array.

````javascript 
  // @params string name unique name of the action e.g. "DARK_MODE_TOGGLE"
  // @params string store store to update
  // @params string subStoreKey points to the sub state key you wish to update e.g. store['darkMode']
  // @params Function fn this is the custom function logic applied e.g. function(s) { return !s } will reverse a booleans the state
  // @params boolean isAsync if the call back fn is async or not
  // @returns void
  statePilot.createStoreActions(
    [
      {
        name
        store
        subStoreKey
        fn
        isAsync
      }
    ]
  );
````

unsubscribe from a store subscription variable instance.

````javascript
  // @description unsubscribe from single subscription
  unSubUserSettings();
````

unsubscribe from an entire store.

````javascript 
  // @description unsubscribe all subscribers from a store
  statePilot.unsubscribe('userSettings');
````

example use of library

````javascript

  import { StatePilot } from 'state-pilot';

  // create new instance of statePilot
  const statePilot = new statePilot();
  
  // create stores
  statePilot.createStore('userSettings', true);
  statePilot.createStore('viewNavigation', true);

  // add a view state
  statePilot.createStoreState('viewNavigation', { path: '/home', name: 'home' });
  
  // add a user settings state
  statePilot.createStoreState('userSettings', { darkMode: true });

  // create a store action
  statePilot.createStoreAction('TOGGLE_DARK_MODE', 'userSettings', 'darkMode', function(s) { return !s });
  
  // add some subscriptions to listen for changes
  const unSubscribeUserSettings = statePilot.unsubscribe('userSettings', data => { /* do something with data */ });
  const unSubscribeVieNavigation = statePilot.unsubscribe('viewNavigation', data => { /* do something with data */ }););

  // invoke state changes to be recieved by subscribers
  statePilot.createStoreState('viewNavigation', { path: '/contact', name: 'contact' });
  
  // invoke state change via triggerStoreAction to be recieved by subscribers
  statePilot.triggerStoreAction.TOGGLE_DARK_MODE(statePilot.getStoreState('userSettings').darkMode);

````




