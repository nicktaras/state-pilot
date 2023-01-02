"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateKeeper = void 0;
class StateKeeper {
    constructor() {
        // all states are held within a store
        this.stateStore = {
        /*
          view: [
            { page: "dashboard", params: {} }
          ]
        */
        };
    }
    importStore(store) {
        this.stateStore = store;
        return this.stateStore;
    }
    createStore(stateStoreName) {
        if (this.stateStore[stateStoreName])
            throw new Error("Store name already exists");
        else
            this.stateStore[stateStoreName] = [];
        return this.stateStore[stateStoreName];
    }
    createStoreState(stateStoreName, state) {
        if (!this.stateStore[stateStoreName])
            throw new Error("Store doesn't exist");
        else
            this.stateStore[stateStoreName].push(state);
        return this.stateStore[stateStoreName][0];
    }
    getStoreState(stateStoreName) {
        if (!this.stateStore[stateStoreName])
            throw new Error("Store doesn't exist");
        return this.stateStore[stateStoreName][0];
    }
    getStoreStateHistory(stateStoreName, startIndex, lastIndex) {
        if (!this.stateStore[stateStoreName])
            throw new Error("Store doesn't exist");
        const _lastIndex = lastIndex >= this.stateStore[stateStoreName].length ? this.stateStore[stateStoreName].length : lastIndex;
        return this.stateStore[stateStoreName].slice(startIndex, _lastIndex);
    }
    exportStore() {
        return this.stateStore;
    }
}
exports.StateKeeper = StateKeeper;
