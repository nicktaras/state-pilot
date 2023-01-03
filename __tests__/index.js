import { StateKeeper } from './../index';

test('create new store', () => {
  const stateKeeper = new StateKeeper();
  expect(stateKeeper.createStore("views")).toEqual([]);
});

test('create new store state', () => {
  const stateKeeper = new StateKeeper();
  stateKeeper.createStore("views");
  expect(stateKeeper.createStoreState("views", { path: "/home", pageName: "home" })).toEqual(
    { path: "/home", pageName: "home" }
  );
});

test('get current store state', () => {
  const stateKeeper = new StateKeeper();
  stateKeeper.createStore("views");
  stateKeeper.createStoreState("views", { path: "/home", pageName: "home" });
  expect(stateKeeper.getStoreState("views")).toEqual(
    { path: "/home", pageName: "home" }
  );
});

test('get current store state history', () => {
  const stateKeeper = new StateKeeper();
  stateKeeper.createStore("views");
  stateKeeper.createStoreState("views", { path: "/home", pageName: "home" });
  stateKeeper.createStoreState("views", { path: "/about", pageName: "about" });
  stateKeeper.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(stateKeeper.getStoreStateHistory("views", 0, 100)).toEqual(
    [{"pageName": "contact", "path": "/contact"}, {"pageName": "about", "path": "/about"}, {"pageName": "home", "path": "/home"}]
  );
});

test('create a few stores and check current state history', () => {
  const stateKeeper = new StateKeeper();
  stateKeeper.createStore("views");
  stateKeeper.createStoreState("views", { path: "/home", pageName: "home" });
  stateKeeper.createStoreState("views", { path: "/about", pageName: "about" });
  stateKeeper.createStoreState("views", { path: "/contact", pageName: "contact" });
  stateKeeper.createStore("settings");
  stateKeeper.createStoreState("settings", { darkMode: true, privacyMode: true });
  expect(stateKeeper.getStoreStateHistory("views", 0, 100)).toEqual(
    [{"pageName": "contact", "path": "/contact"}, {"pageName": "about", "path": "/about"}, {"pageName": "home", "path": "/home"}]
  );
  expect(stateKeeper.getStoreStateHistory("settings", 0, 100)).toEqual(
    [{"darkMode": true, "privacyMode": true}]
  );
});

test('export store data', () => {
  const stateKeeper = new StateKeeper();
  stateKeeper.createStore("views");
  stateKeeper.createStoreState("views", { path: "/home", pageName: "home" });
  stateKeeper.createStoreState("views", { path: "/about", pageName: "about" });
  stateKeeper.createStoreState("views", { path: "/contact", pageName: "contact" });
  expect(stateKeeper.exportStore()).toEqual({"views": [{"pageName": "contact", "path": "/contact"}, {"pageName": "about", "path": "/about"}, {"pageName": "home", "path": "/home"}]})
});

test('import store data', () => {
  const stateKeeper = new StateKeeper();
  expect(stateKeeper.importStore(
    {"views": [{"pageName": "home", "path": "/home"}, {"pageName": "about", "path": "/about"}, {"pageName": "contact", "path": "/contact"}]}
  )).toEqual({"views": [{"pageName": "home", "path": "/home"}, {"pageName": "about", "path": "/about"}, {"pageName": "contact", "path": "/contact"}]});
});

