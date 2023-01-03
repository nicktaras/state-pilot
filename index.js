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
        this.eventRegister = {};
        this.subIds = 0;
        this.subscriptions = {};
    }
    // import a previously exported store
    importStore(store) {
        this.stateStore = store;
        return this.stateStore;
    }
    // export store
    exportStore() {
        return this.stateStore;
    }
    // create a new store e.g. 'userSettings'
    createStore(storeName) {
        if (this.stateStore[storeName]) {
            throw new Error("Store name already exists");
        }
        else {
            this.stateStore[storeName] = [];
        }
        return this.eventHandler('createStore', storeName, this.stateStore[storeName]);
    }
    // create a new store state e.g. 'userSettings', [{ darkMode: true, theme: 'fresh', lang: 'en-us' }]
    // using any data structure(s) format required per store.
    createStoreState(storeName, state) {
        if (!this.stateStore[storeName]) {
            throw new Error("Store doesn't exist");
        }
        else {
            this.stateStore[storeName].unshift(state);
        }
        return this.eventHandler('createStoreState', storeName, this.stateStore[storeName][0]);
    }
    // get most recent stores state
    getStoreState(storeName) {
        if (!this.stateStore[storeName])
            throw new Error("Store doesn't exist");
        return this.eventHandler('getStoreState', storeName, this.stateStore[storeName][0]);
    }
    // get all of a store states
    getAllStoreStateHistory(storeName) {
        return this.eventHandler('getAllStoreStateHistory', storeName, this.stateStore[storeName].slice(0, this.stateStore[storeName].length));
    }
    // get a selection of states from a store
    getStoreStateHistory(storeName, startIndex, lastIndex) {
        if (!this.stateStore[storeName]) {
            throw new Error("Store doesn't exist");
        }
        const _lastIndex = lastIndex >= this.stateStore[storeName].length ? this.stateStore[storeName].length : lastIndex;
        return this.eventHandler('getStoreStateHistory', storeName, this.stateStore[storeName].slice(startIndex, _lastIndex));
    }
    // subscribe to a store
    subscribe(topic, fn) {
        if (!this.subscriptions[topic])
            this.subscriptions[topic] = {};
        const token = ++this.subIds;
        // Validate topic name and function
        this.subscriptions[topic][token] = fn;
        return () => this.unsubscribe(topic, token);
    }
    // unsubscibe from a store
    unsubscribe(topic, token) {
        if (!token)
            delete this.subscriptions[topic]; // Delete all subscriptions for the topic
        this.subscriptions[topic] && (delete this.subscriptions[topic][token]); // Delete specific subscription
    }
    // publish event from a store
    eventHandler(eventName, storeName, state) {
        this.publish(storeName, { storeName, eventName, state });
        return state;
    }
    // publish a new topic or update to store
    publish(topic, ...args) {
        const subs = this.subscriptions[topic];
        if (!subs) {
            return false;
        }
        Object.values(subs).forEach(sub => sub(...args));
    }
}
exports.StateKeeper = StateKeeper;
