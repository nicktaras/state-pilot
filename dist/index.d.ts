import { StateAction } from "./types";
export declare class StatePilot {
    subIds: number;
    subscriptions: {};
    stateStore: {};
    triggerStoreAction: object;
    constructor(previousState: any);
    importStore(store: any): {};
    exportStore(): {};
    private throwErrorCheck;
    createStore(storeName: string, initialState: any, useHistory?: boolean): any;
    createStoreState(storeName: string, state: any, storeAction?: string, storeActionSubKey?: string): any;
    createPastStoreState(storeName: string, state: any): Promise<void>;
    createStoreActions(actions: StateAction[]): void;
    createStoreAction(name: string, store: string, subStoreKey: string, fn: Function, isAsync?: boolean): void;
    getPreviousState(storeName: string, previousIndex: number): any;
    applyPreviousState(storeName: string): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: string): any;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(store: string, callbackFn: Function, actions: any[]): () => string;
    unsubscribe(store: string, subId: number): string;
    private eventHandler;
    private publish;
}
