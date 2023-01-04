import { StateDriver } from './../dist/index';

test('create new store without history', () => {
  const stateDriver = new StateDriver();
  expect(stateDriver.createStore("views", false)).toEqual([]);
});

test('throw error when trying to create duplicate store', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false)
  expect(() => { stateDriver.createStore("views", false) }).toThrow("Store name already exists");
});

test('create new store state without history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  expect(stateDriver.createStoreState("views", { path: "/home", pageName: "home" })).toEqual(
    { path: "/home", pageName: "home" }
  );
});

test('throw error when createStoreState cannot locate a store', () => {
  const stateDriver = new StateDriver();
  expect(() => { stateDriver.createStoreState("views", false) }).toThrow("Store doesn't exist");
});

test('throw error when previous state cannot locate a store', () => {
  const stateDriver = new StateDriver();
  expect(() => { stateDriver.getPreviousState("views", false) }).toThrow("Store doesn't exist");
});

test('throw error when previous state cannot locate history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  expect(() => { stateDriver.getPreviousState("views", false) }).toThrow("Store has no history");
});

test('get current store state', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  expect(stateDriver.getStoreState("views")).toEqual(
    { path: "/home", pageName: "home" }
  );
});

test('get current store state history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  stateDriver.createStoreState("views", { path: "/about", pageName: "about" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(stateDriver.getStoreStateHistory("views", 0, 100)).toEqual(
    [{"pageName": "contact", "path": "/contact"}, {"pageName": "about", "path": "/about"}, {"pageName": "home", "path": "/home"}]
  );
});

test('create a few stores and check current state history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/about", pageName: "about" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateDriver.createStore("settings");
  stateDriver.createStoreState("settings", { darkMode: true, privacyMode: true });
  expect(stateDriver.getStoreStateHistory("views", 0, 100)).toEqual(
    [{"pageName": "contact", "path": "/contact"}, {"pageName": "about", "path": "/about"}]
  );
  expect(stateDriver.getStoreState("settings")).toEqual(
    {"darkMode": true, "privacyMode": true}
  );
});

test('export store data', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(stateDriver.exportStore()).toEqual(
    {"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}}
  );
});

test('import store data', () => {
  const stateDriver = new StateDriver();
  expect(stateDriver.importStore(
    {"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}}
  )).toEqual({"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}});
});

test('import store data onload', () => {
  const stateDriver = new StateDriver({"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}});
  expect(stateDriver.getStoreState("views")).toEqual({"pageName": "contact", "path": "/contact"});
});

test('get previous state', () => {
  const stateDriver = new StateDriver({"views": { "useHistory": true, "state": [{"pageName": "home", "path": "/home"}]}});
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(stateDriver.getPreviousState("views", 1)).toEqual({"pageName": "home", "path": "/home"});
});



