import React, {useState, useContext} from "react";
import './App.css';
import { StateDriver } from 'state-driver';

// state driver initial setup
const stateDriver = new StateDriver();
// create settings store
stateDriver.createStore('settings', true);
// add settings store initial state
stateDriver.createStoreState('settings', { darkMode: true });
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

function Pub(props) {

  const { stateDriver } = useContext(StateDriverContext);

  function toggleSettings () {
    stateDriver.createStoreState('settings', { 
      darkMode: !stateDriver.getStoreState('settings').darkMode
    });
  }
  
  function previousSettings () {
    stateDriver.createStoreState('settings', {
      darkMode: stateDriver.getPreviousState('settings', 1).darkMode
    });
  }

  return (
    <p>
      <button onClick={e => { toggleSettings(e) }}>Toggle State Change Event</button>&nbsp;&nbsp;&nbsp;
      <button onClick={e => { previousSettings(e) }}>Undo/Redo Change Event</button>
    </p>
  );
}

function Sub() {

  const [darkMode, setDarkMode] = useState("true");

  const { stateDriver } = useContext(StateDriverContext);

  const unSubUserSettings = stateDriver.subscribe('settings', data => {
    setDarkMode(data.state.darkMode.toString());
  });
  
  return (
    <div>Subscribe to published event, lastest state is {darkMode}</div>
  );
}

export default App;
