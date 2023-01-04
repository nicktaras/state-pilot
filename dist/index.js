var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var StateDriver = (function () {
    function StateDriver() {
        this.subIds = 0;
        this.subscriptions = {};
        this.stateStore = {};
    }
    StateDriver.prototype.importStore = function (store) {
        this.stateStore = store;
        return this.stateStore;
    };
    StateDriver.prototype.exportStore = function () {
        return this.stateStore;
    };
    StateDriver.prototype.createStore = function (storeName, useHistory) {
        if (this.stateStore[storeName]) {
            throw new Error("Store name already exists");
        }
        this.stateStore[storeName] = { useHistory: useHistory === true ? true : false, state: [] };
        return this.eventHandler('createStore', storeName, this.stateStore[storeName].state);
    };
    StateDriver.prototype.createStoreState = function (storeName, state) {
        if (!this.stateStore[storeName]) {
            throw new Error("Store doesn't exist");
        }
        if (this.stateStore[storeName].useHistory === false) {
            this.stateStore[storeName].state = [state];
        }
        else {
            this.stateStore[storeName].state.unshift(state);
        }
        return this.eventHandler('createStoreState', storeName, this.stateStore[storeName].state[0]);
    };
    StateDriver.prototype.getPreviousState = function (storeName, previousIndex) {
        if (!this.stateStore[storeName]) {
            throw new Error("Store doesn't exist");
        }
        var _previousIndex = previousIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : previousIndex;
        return this.eventHandler('getPreviousState', storeName, this.stateStore[storeName].state[_previousIndex]);
    };
    StateDriver.prototype.getStoreState = function (storeName) {
        if (!this.stateStore[storeName])
            throw new Error("Store doesn't exist");
        return this.eventHandler('getStoreState', storeName, this.stateStore[storeName].state[0]);
    };
    StateDriver.prototype.getAllStoreStateHistory = function (storeName) {
        return this.eventHandler('getAllStoreStateHistory', storeName, this.stateStore[storeName].state.slice(0, this.stateStore[storeName].state.length - 1));
    };
    StateDriver.prototype.getStoreStateHistory = function (storeName, startIndex, lastIndex) {
        if (!this.stateStore[storeName]) {
            throw new Error("Store doesn't exist");
        }
        var _lastIndex = lastIndex >= this.stateStore[storeName].state.length ? this.stateStore[storeName].state.length : lastIndex;
        return this.eventHandler('getStoreStateHistory', storeName, this.stateStore[storeName].state.slice(startIndex, _lastIndex));
    };
    StateDriver.prototype.subscribe = function (topic, fn) {
        var _this = this;
        if (!this.subscriptions[topic])
            this.subscriptions[topic] = {};
        var token = ++this.subIds;
        this.subscriptions[topic][token] = fn;
        return function () { return _this.unsubscribe(topic, token); };
    };
    StateDriver.prototype.unsubscribe = function (topic, token) {
        if (!token)
            delete this.subscriptions[topic];
        this.subscriptions[topic] && (delete this.subscriptions[topic][token]);
    };
    StateDriver.prototype.eventHandler = function (eventName, storeName, state) {
        this.publish(storeName, { storeName: storeName, eventName: eventName, state: state });
        return state;
    };
    StateDriver.prototype.publish = function (topic) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var subs = this.subscriptions[topic];
        if (!subs) {
            return false;
        }
        ;
        Object.values(subs).forEach(function (sub) { return sub.apply(void 0, __spreadArray([], __read(args), false)); });
    };
    StateDriver.prototype.createStoreActions = function (storeName, actions) {
        this.storeActions[storeName] = new actions();
    };
    return StateDriver;
}());
export { StateDriver };
//# sourceMappingURL=index.js.map