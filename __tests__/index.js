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

test('throw error when createStoreState cannot locate a store', () => {
  const stateDriver = new StateDriver();
  expect(() => { stateDriver.getStoreState("views", false) }).toThrow("Store doesn't exist");
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
    [{"pageName": "home", "path": "/home"}, {"pageName": "about", "path": "/about"}, {"pageName": "contact", "path": "/contact"}]
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
    [{"pageName": "about", "path": "/about"}, {"pageName": "contact", "path": "/contact"}]
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
    { "views": {"past": [], "state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false }}
  );
});

test('import store data', () => {
  const stateDriver = new StateDriver();
  expect(stateDriver.importStore(
    {"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}}
  )).toEqual(
    {"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}}
  );
});

test('import store data onload', () => {
  const stateDriver = new StateDriver({"views": {"state": [{"pageName": "contact", "path": "/contact"}], "useHistory": false}});
  expect(stateDriver.getStoreState("views")).toEqual({"pageName": "contact", "path": "/contact"});
});

test('get previous state', () => {
  const stateDriver = new StateDriver({"views": { "useHistory": true, "past": [], "state": [{"pageName": "home", "path": "/home"}]}});
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(
    stateDriver.getPreviousState("views", 0)).toEqual({"pageName": "home", "path": "/home"}
  );
});

test('undo single state', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateDriver.createStoreState("views", { path: "/settings", pageName: "settings" });
  stateDriver.applyPreviousState("views");
  expect(
    stateDriver.getStoreState("views")
  ).toEqual({ path: "/contact", pageName: "contact" });
});

test('undo multiple states', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateDriver.createStoreState("views", { path: "/settings", pageName: "settings" });
  stateDriver.applyPreviousState("views");
  stateDriver.applyPreviousState("views");
  expect(
    stateDriver.getStoreState("views")
  ).toEqual({ path: "/home", pageName: "home" });
});

test('undo multiple states until null', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateDriver.createStoreState("views", { path: "/settings", pageName: "settings" });
  stateDriver.applyPreviousState("views");
  stateDriver.applyPreviousState("views");
  stateDriver.applyPreviousState("views");
  expect(
    stateDriver.getStoreState("views")
  ).toEqual(undefined);
});

test('get all state history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", true);
  stateDriver.createStoreState("views", { path: "/home", pageName: "home" });
  stateDriver.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateDriver.createStoreState("views", { path: "/settings", pageName: "settings" });
  expect(
    stateDriver.getAllStoreStateHistory("views")
  ).toEqual(
    [{"pageName": "home", "path": "/home"}, {"pageName": "contact", "path": "/contact"}, {"pageName": "settings", "path": "/settings"}]
  );
});

test('throw error when applyPreviousState cannot locate a store', () => {
  const stateDriver = new StateDriver();
  expect(() => { stateDriver.applyPreviousState("") }).toThrow("Store doesn't exist");
});

test('throw error when applyPreviousState cannot locate history', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  expect(() => { stateDriver.applyPreviousState("views") }).toThrow("Store has no history");
});

test('throw error when store action is duplicated', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  stateDriver.createAction("CHANGE_VIEW", "views", "path", false, () => {});
  expect(() => {stateDriver.createAction("CHANGE_VIEW", "views", "path", false, () => {}) }).toThrow("Action already exists");
});

test('create non async action for view store', () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  stateDriver.createAction("CHANGE_VIEW", "views", "path", false, (newState) => { return newState });
  expect(stateDriver.actions["CHANGE_VIEW"]("/home")).toEqual({ path: "/home" });
});

test('create async action for view store', async () => {
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  stateDriver.createAction("CHANGE_VIEW", "views", "path", true, async (newState) => { return Promise.resolve(newState) });
  const out = await stateDriver.actions["CHANGE_VIEW"]("/home");
  expect(out).toEqual({ path: "/home" });
});

test('subscribe to a store', () => {
  const mockCallback = jest.fn();
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  const unSubViews = stateDriver.subscribe('views', mockCallback());
  expect(typeof unSubViews).toEqual("function");
});

test('unsubscribe from a store', () => {
  const mockCallback = jest.fn();
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  const unSubViews = stateDriver.subscribe('views', mockCallback());
  expect(unSubViews()).toEqual("unsubcribed from store views with subscription id 1");
});

test('subscribe to a store', async () => {
  const mockCallback = jest.fn();
  const stateDriver = new StateDriver();
  stateDriver.createStore("views", false);
  stateDriver.createStoreState("views", { path: "/settings" });
  const unSubViews = stateDriver.subscribe('views', mockCallback());
  stateDriver.createStoreState("views", { path: "/home" });
  expect(mockCallback.mock.calls).toHaveLength(1);
});


