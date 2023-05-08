import { StateAction } from "./types";
export declare class StatePilot {
    subIds: number;
    subscriptions: {};
    stateStore: {};
    triggerAction: object;
    constructor(previousState: any);
    importStore(store: any): {};
    exportStore(): {};
    private throwErrorCheck;
    createStore(storeName: string, initialState: any, useHistory?: boolean): any;
    createStoreState(storeName: string, state: any): any;
    createPastStoreState(storeName: string, state: any): Promise<void>;
    createActions(actions: StateAction[]): void;
    createAction(name: string, store: string, subStoreKey: string, fn: Function, isAsync?: boolean): void;
    getPreviousState(storeName: string, previousIndex: any): any;
    applyPreviousState(storeName: string): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: string): any;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(store: string, callbackFn: Function): () => string;
    unsubscribe(store: string, subId: number): string;
    private eventHandler;
    private publish;
}
