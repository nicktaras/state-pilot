import { StateAction } from "./types";
import {
  STORE_ALREADY_EXISTS,
  STORE_DOESNT_EXIST,
  ACTION_ALREADY_EXISTS,
  STORE_HAS_NO_HISTORY,
  NO_PREVIOUS_STATE_EXISTS,
  UNSUBSCRIBE_FROM_STORE_MESSAGE,
  NO_SUB_ID_FOUND
} from "./messaging";

const CREATE_STORE = "createStore";
const CREATE_STORE_STATE = "createStoreState";
const GET_PREVIOUS_STATE = "getPreviousState";

export class StatePilot {
  subIds: number;
  subscriptions: {};
  stateStore: {};
  triggerStoreAction: object;

  constructor(previousState: any) {
    this.subIds = 0;
    this.subscriptions = {};
    this.triggerStoreAction = {};
    if (previousState) {
      this.stateStore = previousState;
    } else {
      this.stateStore = {
        /*
          view: [
            { useHistory: boolean, state: any }
          ]
        */
      };
    }
  }

  public importStore(store: any) {
    this.stateStore = store;
    return this.stateStore;
  }

  public exportStore() {
    return this.stateStore;
  }

  private throwErrorCheck(errorArgIsTrue: boolean, message: string) {
    if (errorArgIsTrue) throw new Error(message);
  }

  public createStore(storeName: string, initialState: any, useHistory = false) {
    this.throwErrorCheck(this.stateStore[storeName], STORE_ALREADY_EXISTS);
    this.stateStore[storeName] = { useHistory, state: [], past: [] };
    if (initialState) this.createStoreState(storeName, initialState);

    return this.eventHandler(
      CREATE_STORE,
      storeName,
      this.stateStore[storeName].state
    );
  }

  public createStoreState(
    storeName: string,
    state: any,
    storeAction?: string,
    storeActionSubKey?: string
  ) {
    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    if (this.stateStore[storeName].useHistory === false) {
      this.stateStore[storeName].state = [state];
    } else {
      this.stateStore[storeName].state.push(state);
      this.createPastStoreState(storeName, state);
    }
    return this.eventHandler(
      CREATE_STORE_STATE,
      storeName,
      this.stateStore[storeName].state[
      this.stateStore[storeName].state.length - 1
      ],
      storeAction,
      storeActionSubKey
    );
  }

  async createPastStoreState(storeName: string, state: any) {
    Promise.resolve(this.stateStore[storeName].past.push(state));
  }

  public createStoreActions(actions: StateAction[]) {
    actions.forEach((action) => {
      this.createStoreAction(
        action.name,
        action.store,
        action.subStoreKey,
        action.fn,
        action.isAsync
      );
    });
  }

  public createStoreAction(
    name: string,
    store: string,
    subStoreKey: string,
    fn: Function,
    isAsync: boolean = false
  ) {
    this.throwErrorCheck(this.triggerStoreAction[name], ACTION_ALREADY_EXISTS);
    if (isAsync) {
      const _fn = async (newState) => {
        const currState = this.getStoreState(store);
        let nextState = currState;
        nextState[subStoreKey] = await fn(newState);
        return this.createStoreState(store, nextState, name, subStoreKey);
      };
      this.triggerStoreAction[name] = _fn.bind(this);
    } else {
      const _fn = (newState) => {
        let nextState = Object.assign({}, this.getStoreState(store));
        nextState[subStoreKey] = fn(newState);
        return this.createStoreState(store, nextState, name, subStoreKey);
      };
      this.triggerStoreAction[name] = _fn.bind(this);
    }
  }

  public getPreviousState(storeName: string, previousIndex: number) {

    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    this.throwErrorCheck(
      !this.stateStore[storeName].useHistory,
      STORE_HAS_NO_HISTORY
    );

    const storeState = this.stateStore[storeName].state;
    const maxIndex = storeState.length - 1;

    const _previousIndex = Math.max(0, Math.min(previousIndex, maxIndex));

    return storeState[_previousIndex];
  }

  public applyPreviousState(storeName: string) {
    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    this.throwErrorCheck(
      !this.stateStore[storeName].useHistory,
      STORE_HAS_NO_HISTORY
    );
    if (
      this.stateStore[storeName].state[
      this.stateStore[storeName].past.length - 2
      ]
    ) {
      this.stateStore[storeName].state.push(
        this.stateStore[storeName].state[
        this.stateStore[storeName].past.length - 2
        ]
      );
      this.stateStore[storeName].past.pop();
      return this.eventHandler(
        GET_PREVIOUS_STATE,
        storeName,
        this.stateStore[storeName].past[
        this.stateStore[storeName].past.length - 1
        ]
      );
    } else {
      return NO_PREVIOUS_STATE_EXISTS;
    }
  }

  public getStoreState(storeName: string) {
    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    return this.stateStore[storeName].state[
      this.stateStore[storeName].state.length - 1
    ];
  }

  public getAllStoreStateHistory(storeName: string) {
    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    this.throwErrorCheck(
      !this.stateStore[storeName].useHistory,
      STORE_HAS_NO_HISTORY
    );
    return this.stateStore[storeName].state.slice(
      0,
      this.stateStore[storeName].state.length
    );
  }

  public getStoreStateHistory(
    storeName: string,
    startIndex: number,
    lastIndex: number
  ) {
    this.throwErrorCheck(!this.stateStore[storeName], STORE_DOESNT_EXIST);
    this.throwErrorCheck(
      !this.stateStore[storeName].useHistory,
      STORE_HAS_NO_HISTORY
    );
    const _lastIndex =
      lastIndex >= this.stateStore[storeName].state.length
        ? this.stateStore[storeName].state.length
        : lastIndex;
    return this.stateStore[storeName].state.slice(startIndex, _lastIndex);
  }

  public subscribe(store: string, callbackFn: Function, actions: any[]) {
    if (!this.subscriptions[store]) this.subscriptions[store] = {};
    const subId = ++this.subIds;
    this.subscriptions[store][subId] = callbackFn;
    return () => this.unsubscribe(store, subId);
  }

  public unsubscribe(store: string, subId: number) {
    this.subscriptions[store] && delete this.subscriptions[store][subId];
    // return `unsubcribed from store ${store} with subscription id ${subId}`;
    return UNSUBSCRIBE_FROM_STORE_MESSAGE(store, subId);
  }

  private eventHandler(
    eventName: string,
    storeName: string,
    state: any,
    storeAction?: string,
    storeActionSubKey?: string
  ) {
    if (storeAction && storeActionSubKey) {
      this.publish(storeName, {
        storeName,
        eventName,
        actionName: storeAction,
        actionData: state[storeActionSubKey],
        data: state
      });
    } else {
      this.publish(storeName, {
        storeName,
        eventName,
        data: state,
        actionName: undefined
      });
    }
    return state;
  }

  private publish(store: string, ...args: any) {
    const subs = this.subscriptions[store];
    if (!subs) {
      return false;
    }
    Object.values(subs).forEach((sub: any) => {
      if (sub) sub(...args);
    });
  }
}
