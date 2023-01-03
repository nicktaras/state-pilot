import { StateDriver } from './../dist/index';

test('create new store without history', () => {
  const stateDriver = new StateDriver();
  expect(stateDriver.createStore("views", false)).toEqual([]);
});

test('create new store state without history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  expect(stateDriver.createStoreState("views", { path: "/home", pageName: "home" })).toEqual(
    { path: "/home", pageName: "home" }
  );
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

