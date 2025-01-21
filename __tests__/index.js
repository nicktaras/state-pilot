import {StatePilot} from "./../dist/index";

test("create new store without history", () => {
  const statePilot = new StatePilot();
  expect(statePilot.createStore("views")).toEqual([]);
});

test("throw error when trying to create duplicate store", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  expect(() => {
    statePilot.createStore("views");
  }).toThrow("Store name already exists");
});

test("create new store state without history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  expect(
    statePilot.createStoreState("views", {path: "/home", pageName: "home"})
  ).toEqual({path: "/home", pageName: "home"});
});

test("throw error when createStoreState cannot locate a store", () => {
  const statePilot = new StatePilot();
  expect(() => {
    statePilot.createStoreState("views");
  }).toThrow("Store doesn't exist");
});

test("throw error when createStoreState cannot locate a store", () => {
  const statePilot = new StatePilot();
  expect(() => {
    statePilot.getStoreState("views");
  }).toThrow("Store doesn't exist");
});

test("throw error when previous state cannot locate a store", () => {
  const statePilot = new StatePilot();
  expect(() => {
    statePilot.getPreviousState("views");
  }).toThrow("Store doesn't exist");
});

test("returns the last state when the previous index exceeds the history length", () => {
  const statePilot = new StatePilot();
  statePilot.stateStore = {
    views: {
      useHistory: true,
      state: ["state1", "state2", "state3"],
    },
  };
  
  const result = statePilot.getPreviousState("views", 10);
  expect(result).toBe("state3");
});

test("returns the middel state when the previous index matches", () => {
  const statePilot = new StatePilot();
  statePilot.stateStore = {
    views: {
      useHistory: true,
      state: ["state1", "state2", "state3"],
    },
  };

  const result = statePilot.getPreviousState("views", 1);
  expect(result).toBe("state2");
});

test("returns the correct state when previousIndex is zero", () => {
  const statePilot = new StatePilot();
  statePilot.stateStore = {
    views: {
      useHistory: true,
      state: ["state1", "state2", "state3"],
    },
  };

  const result = statePilot.getPreviousState("views", 0);
  expect(result).toBe("state1");
});

test("returns the first state when previousIndex is negative", () => {
  const statePilot = new StatePilot();
  statePilot.stateStore = {
    views: {
      useHistory: true,
      state: ["state1", "state2", "state3"],
    },
  };

  const result = statePilot.getPreviousState("views", -1);
  expect(result).toBe("state1");
});

test("throw error when previous state cannot locate history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  expect(() => {
    statePilot.getPreviousState("views");
  }).toThrow("Store has no history");
});

test("get current store state", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  expect(statePilot.getStoreState("views")).toEqual({
    path: "/home",
    pageName: "home"
  });
});

test("get current store state history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  statePilot.createStoreState("views", {path: "/about", pageName: "about"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  expect(statePilot.getStoreStateHistory("views", 0, 100)).toEqual([
    {pageName: "home", path: "/home"},
    {pageName: "about", path: "/about"},
    {pageName: "contact", path: "/contact"}
  ]);
});

test("create a few stores and check current state history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/about", pageName: "about"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  statePilot.createStore("settings");
  statePilot.createStoreState("settings", {darkMode: true, privacyMode: true});
  expect(statePilot.getStoreStateHistory("views", 0, 100)).toEqual([
    {pageName: "about", path: "/about"},
    {pageName: "contact", path: "/contact"}
  ]);
  expect(statePilot.getStoreState("settings")).toEqual({
    darkMode: true,
    privacyMode: true
  });
});

test("export store data", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  expect(statePilot.exportStore()).toEqual({
    views: {
      past: [],
      state: [{pageName: "contact", path: "/contact"}],
      useHistory: false
    }
  });
});

test("import store data", () => {
  const statePilot = new StatePilot();
  expect(
    statePilot.importStore({
      views: {
        state: [{pageName: "contact", path: "/contact"}],
        useHistory: false
      }
    })
  ).toEqual({
    views: {state: [{pageName: "contact", path: "/contact"}], useHistory: false}
  });
});

test("import store data onload", () => {
  const statePilot = new StatePilot({
    views: {state: [{pageName: "contact", path: "/contact"}], useHistory: false}
  });
  expect(statePilot.getStoreState("views")).toEqual({
    pageName: "contact",
    path: "/contact"
  });
});

test("get previous state", () => {
  const statePilot = new StatePilot({
    views: {
      useHistory: true,
      past: [],
      state: [{pageName: "home", path: "/home"}]
    }
  });
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  expect(statePilot.getPreviousState("views", 0)).toEqual({
    pageName: "home",
    path: "/home"
  });
});

test("undo single state", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  statePilot.createStoreState("views", {
    path: "/settings",
    pageName: "settings"
  });
  statePilot.applyPreviousState("views");
  expect(statePilot.getStoreState("views")).toEqual({
    path: "/contact",
    pageName: "contact"
  });
});

test("undo multiple states", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  statePilot.createStoreState("views", {
    path: "/settings",
    pageName: "settings"
  });
  statePilot.applyPreviousState("views");
  statePilot.applyPreviousState("views");
  expect(statePilot.getStoreState("views")).toEqual({
    path: "/home",
    pageName: "home"
  });
});

test("undo multiple states until initial", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  statePilot.createStoreState("views", {
    path: "/settings",
    pageName: "settings"
  });
  statePilot.applyPreviousState("views");
  statePilot.applyPreviousState("views");
  statePilot.applyPreviousState("views");
  expect(statePilot.getStoreState("views")).toEqual({
    pageName: "home",
    path: "/home"
  });
});

test("get all state history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views", null, true);
  statePilot.createStoreState("views", {path: "/home", pageName: "home"});
  statePilot.createStoreState("views", {path: "/contact", pageName: "contact"});
  statePilot.createStoreState("views", {
    path: "/settings",
    pageName: "settings"
  });
  expect(statePilot.getAllStoreStateHistory("views")).toEqual([
    {pageName: "home", path: "/home"},
    {pageName: "contact", path: "/contact"},
    {pageName: "settings", path: "/settings"}
  ]);
});

test("throw error when applyPreviousState cannot locate a store", () => {
  const statePilot = new StatePilot();
  expect(() => {
    statePilot.applyPreviousState("");
  }).toThrow("Store doesn't exist");
});

test("throw error when applyPreviousState cannot locate history", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  expect(() => {
    statePilot.applyPreviousState("views");
  }).toThrow("Store has no history");
});

test("throw error when store action is duplicated", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  statePilot.createStoreAction("CHANGE_VIEW", "views", "path", () => {});
  expect(() => {
    statePilot.createStoreAction("CHANGE_VIEW", "views", "path", () => {});
  }).toThrow("Action already exists");
});

test("can create many actions", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings", showNavBar: false});
  statePilot.createStoreActions([
    {
      name: "CHANGE_VIEW",
      store: "views",
      subStoreKey: "path",
      fn: (newState) => {
        return newState;
      },
      isAsync: false
    },
    {
      name: "TOGGLE_NAV_BAR",
      store: "views",
      subStoreKey: "showNavBar",
      fn: (s) => {
        return !s;
      },
      isAsync: false
    }
  ]);
  expect(statePilot.triggerStoreAction["CHANGE_VIEW"]("/home")).toEqual({
    path: "/home",
    showNavBar: false
  });
  expect(statePilot.triggerStoreAction["TOGGLE_NAV_BAR"](false)).toEqual({
    path: "/home",
    showNavBar: true
  });
});

test("create non async action for view store", () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  statePilot.createStoreAction("CHANGE_VIEW", "views", "path", (newState) => {
    return newState;
  });
  expect(statePilot.triggerStoreAction["CHANGE_VIEW"]("/home")).toEqual({
    path: "/home"
  });
});

test("create async action for view store", async () => {
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  statePilot.createStoreAction(
    "CHANGE_VIEW",
    "views",
    "path",
    async (newState) => {
      return Promise.resolve(newState);
    },
    true
  );
  const out = await statePilot.triggerStoreAction["CHANGE_VIEW"]("/home");
  expect(out).toEqual({path: "/home"});
});

test("subscribe to a store", () => {
  const mockCallback = jest.fn();
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  const unSubViews = statePilot.subscribe("views", mockCallback());
  expect(typeof unSubViews).toEqual("function");
});

test("unsubscribe from a store", () => {
  const mockCallback = jest.fn();
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  const unSubViews = statePilot.subscribe("views", mockCallback());
  expect(unSubViews()).toEqual(
    "unsubscribed from store views with subscription id 1"
  );
});

test("unsubscribe from a store", () => {
  const mockCallback = jest.fn();
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  const unSubViews = statePilot.subscribe("views", mockCallback());
  expect(unSubViews()).toEqual(
    "unsubscribed from store views with subscription id 1"
  );
});

test("subscribe to a store", async () => {
  const mockCallback = jest.fn();
  const statePilot = new StatePilot();
  statePilot.createStore("views");
  statePilot.createStoreState("views", {path: "/settings"});
  const unSubViews = statePilot.subscribe("views", mockCallback());
  statePilot.createStoreState("views", {path: "/home"});
  expect(mockCallback.mock.calls).toHaveLength(1);
});

describe("getStoreStateHistory", () => {
  let statePilot;

  beforeEach(() => {
    statePilot = new StatePilot();
    statePilot["stateStore"] = {
      testStore: {
        useHistory: true,
        state: ["state1", "state2", "state3", "state4", "state5"],
      },
    };
  });

  test("throws an error when the store does not exist", () => {
    expect(() => {
      statePilot.getStoreStateHistory("nonExistentStore", 0, 2);
    }).toThrow("Store doesn't exist");
  });

  test("throws an error when the store does not use history", () => {
    statePilot["stateStore"].testStore.useHistory = false;
    expect(() => {
      statePilot.getStoreStateHistory("testStore", 0, 2);
    }).toThrow("Store has no history");
  });

  test("returns a subset of states when lastIndex is within bounds", () => {
    const result = statePilot.getStoreStateHistory("testStore", 1, 3);
    expect(result).toEqual(["state2", "state3"]);
  });

  test("returns a subset of states when lastIndex exceeds state length", () => {
    const result = statePilot.getStoreStateHistory("testStore", 1, 10);
    expect(result).toEqual(["state2", "state3", "state4", "state5"]);
  });

  test("returns an empty array when startIndex equals lastIndex", () => {
    const result = statePilot.getStoreStateHistory("testStore", 2, 2);
    expect(result).toEqual([]);
  });

  test("returns an empty array when startIndex exceeds lastIndex", () => {
    const result = statePilot.getStoreStateHistory("testStore", 4, 2);
    expect(result).toEqual([]);
  });
});

describe('Simulate State Pilot Publish method', () => {
  let statePilot;

  beforeEach(() => {
    statePilot = new StatePilot(); // Initialize without previous state
  });

  it('should call all subscriptions for a given store with correct arguments', () => {
    const storeName = 'testStore';
    const initialState = { key: 'value' };
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    // Create a store and subscribe to it
    statePilot.createStore(storeName, initialState, true); // Enable history
    statePilot.subscribe(storeName, callback1, []);
    statePilot.subscribe(storeName, callback2, []);

    // Trigger state change
    const newState = { key: 'newValue' };
    statePilot.createStoreState(storeName, newState);

    // Verify callbacks were called
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);

    // Verify arguments passed to the callbacks
    expect(callback1).toHaveBeenCalledWith(
      expect.objectContaining({
        storeName,
        eventName: 'createStoreState',
        data: newState,
        actionName: undefined,
      })
    );
    expect(callback2).toHaveBeenCalledWith(
      expect.objectContaining({
        storeName,
        eventName: 'createStoreState',
        data: newState,
        actionName: undefined,
      })
    );
  });

  it('should not throw an error if there are no subscriptions for a store', () => {
    const storeName = 'emptyStore';
    statePilot.createStore(storeName, {}, true);

    // Publish without subscriptions
    expect(() => statePilot.createStoreState(storeName, { key: 'value' })).not.toThrow();
  });
});
