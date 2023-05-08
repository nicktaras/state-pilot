var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var StatePilot = (function () {
    function StatePilot(previousState) {
        this.subIds = 0;
        this.subscriptions = {};
        this.triggerAction = {};
        if (previousState) {
            this.stateStore = previousState;
        }
        else {
            this.stateStore = {};
        }
    }
    StatePilot.prototype.importStore = function (store) {
        this.stateStore = store;
        return this.stateStore;
    };
    StatePilot.prototype.exportStore = function () {
        return this.stateStore;
    };
    StatePilot.prototype.throwErrorCheck = function (errorArgIsTrue, message) {
        if (errorArgIsTrue)
            throw new Error(message);
    };
    StatePilot.prototype.createStore = function (storeName, initialState, useHistory) {
        if (useHistory === void 0) { useHistory = false; }
        this.throwErrorCheck(this.stateStore[storeName], "Store name already exists");
        this.stateStore[storeName] = { useHistory: useHistory, state: [], past: [] };
        if (initialState)
            this.createStoreState(storeName, initialState);
        return this.eventHandler("createStore", storeName, this.stateStore[storeName].state);
    };
    StatePilot.prototype.createStoreState = function (storeName, state) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        if (this.stateStore[storeName].useHistory === false) {
            this.stateStore[storeName].state = [state];
        }
        else {
            this.stateStore[storeName].state.push(state);
            this.createPastStoreState(storeName, state);
        }
        return this.eventHandler("createStoreState", storeName, this.stateStore[storeName].state[this.stateStore[storeName].state.length - 1]);
    };
    StatePilot.prototype.createPastStoreState = function (storeName, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Promise.resolve(this.stateStore[storeName].past.push(state));
                return [2];
            });
        });
    };
    StatePilot.prototype.createActions = function (actions) {
        var _this = this;
        actions.forEach(function (action) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.createAction(action.name, action.store, action.subStoreKey, action.fn, action.isAsync);
                return [2];
            });
        }); });
    };
    StatePilot.prototype.createAction = function (name, store, subStoreKey, fn, isAsync) {
        var _this = this;
        if (isAsync === void 0) { isAsync = false; }
        this.throwErrorCheck(this.triggerAction[name], "Action already exists");
        if (isAsync) {
            var _fn = function (newState) { return __awaiter(_this, void 0, void 0, function () {
                var currState, nextState, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currState = this.getStoreState(store);
                            nextState = currState;
                            _a = nextState;
                            _b = subStoreKey;
                            return [4, fn(newState)];
                        case 1:
                            _a[_b] = _c.sent();
                            return [2, this.createStoreState(store, nextState)];
                    }
                });
            }); };
            this.triggerAction[name] = _fn.bind(this);
        }
        else {
            var _fn = function (newState) {
                var nextState = Object.assign({}, _this.getStoreState(store));
                nextState[subStoreKey] = fn(newState);
                return _this.createStoreState(store, nextState);
            };
            this.triggerAction[name] = _fn.bind(this);
        }
    };
    StatePilot.prototype.getPreviousState = function (storeName, previousIndex) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
        var _previousIndex = previousIndex >= this.stateStore[storeName].state.length
            ? this.stateStore[storeName].state.length
            : previousIndex;
        return this.stateStore[storeName].state[_previousIndex];
    };
    StatePilot.prototype.applyPreviousState = function (storeName) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
        if (this.stateStore[storeName].state[this.stateStore[storeName].past.length - 2]) {
            this.stateStore[storeName].state.push(this.stateStore[storeName].state[this.stateStore[storeName].past.length - 2]);
            this.stateStore[storeName].past.pop();
            return this.eventHandler("getPreviousState", storeName, this.stateStore[storeName].past[this.stateStore[storeName].past.length - 1]);
        }
        else {
            return "No previous state exists";
        }
    };
    StatePilot.prototype.getStoreState = function (storeName) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        return this.stateStore[storeName].state[this.stateStore[storeName].state.length - 1];
    };
    StatePilot.prototype.getAllStoreStateHistory = function (storeName) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
        return this.stateStore[storeName].state.slice(0, this.stateStore[storeName].state.length);
    };
    StatePilot.prototype.getStoreStateHistory = function (storeName, startIndex, lastIndex) {
        this.throwErrorCheck(!this.stateStore[storeName], "Store doesn't exist");
        this.throwErrorCheck(!this.stateStore[storeName].useHistory, "Store has no history");
        var _lastIndex = lastIndex >= this.stateStore[storeName].state.length
            ? this.stateStore[storeName].state.length
            : lastIndex;
        return this.stateStore[storeName].state.slice(startIndex, _lastIndex);
    };
    StatePilot.prototype.subscribe = function (store, callbackFn) {
        var _this = this;
        if (!this.subscriptions[store])
            this.subscriptions[store] = {};
        var subId = ++this.subIds;
        this.subscriptions[store][subId] = callbackFn;
        return function () { return _this.unsubscribe(store, subId); };
    };
    StatePilot.prototype.unsubscribe = function (store, subId) {
        if (!subId)
            delete this.subscriptions[store];
        this.subscriptions[store] && delete this.subscriptions[store][subId];
        return "unsubcribed from store ".concat(store, " with subscription id ").concat(subId);
    };
    StatePilot.prototype.eventHandler = function (eventName, storeName, state) {
        this.publish(storeName, { storeName: storeName, eventName: eventName, state: state });
        return state;
    };
    StatePilot.prototype.publish = function (store) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var subs = this.subscriptions[store];
        if (!subs) {
            return false;
        }
        Object.values(subs).forEach(function (sub) {
            if (sub)
                sub.apply(void 0, __spreadArray([], __read(args), false));
        });
    };
    return StatePilot;
}());
export { StatePilot };
//# sourceMappingURL=index.js.map