import React, {useState, useContext} from "react";
import './App.css';
// import { StateDriver } from 'state-driver';
import { StateDriver } from './dist/index';

// state driver initial setup
const stateDriver = new StateDriver();

// create settings store
stateDriver.createStore('settings', true);

// add settings store initial state
stateDriver.createStoreState('settings', { darkMode: true });

// example action
stateDriver.createAction('TOGGLE_DARK_MODE', 'settings', 'darkMode', false, function(s) { return !s });

// provide state driver instance to React Context API
const StateDriverContext = React.createContext(stateDriver);

function App() {

  return (
    <StateDriverContext.Provider 
      value={{ stateDriver }}
    >
      <div className="App">
        <header className="App-header">
          <Pub />
          <Sub />
        </header>
      </div>
    </StateDriverContext.Provider>
  );
}

function Pub() {

  const { stateDriver } = useContext(StateDriverContext);

  function toggleSettings () {

    const nextState = stateDriver.getStoreState('settings') ? stateDriver.getStoreState('settings').darkMode : false;

    stateDriver.actions.TOGGLE_DARK_MODE(nextState);
  }
  
  function previousSettings () {
    stateDriver.applyPreviousState('settings');
  }

  return (
    <p>
      <button onClick={e => { toggleSettings(e) }}>Toggle State Change Event</button>&nbsp;&nbsp;&nbsp;
      <button onClick={e => { previousSettings(e) }}>Undo Change Event</button>
    </p>
  );
}

let unSubUserSettings = undefined;

function Sub() {

  const [darkMode, setDarkMode] = useState("true");

  const { stateDriver } = useContext(StateDriverContext);

  if(unSubUserSettings) unSubUserSettings();

  unSubUserSettings = stateDriver.subscribe('settings', data => {
    if(data.state){
      setDarkMode(data.state.darkMode.toString());
    } else {
      setDarkMode("'no state found'");
    }
  });
  
  return (
    <div>Subscribe to published event, lastest state is {darkMode}</div>
  );
}

export default App;
