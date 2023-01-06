export declare class StateDriver {
    subIds: number;
    subscriptions: {};
    stateStore: {};
    actions: object;
    constructor(previousState: any);
    importStore(store: any): {};
    exportStore(): {};
    createStore(storeName: string, useHistory?: boolean): any;
    createStoreState(storeName: string, state: any): any;
    getPreviousState(storeName: string, previousIndex: any): any;
    applyPreviousState(storeName: string): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: any): void;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(topic: any, fn: any): () => void;
    unsubscribe(topic: any, token: any): void;
    private eventHandler;
    private publish;
    createAction(actionName: any, store: any, storeKey: any, isAsync: any, fn: any): void;
}
