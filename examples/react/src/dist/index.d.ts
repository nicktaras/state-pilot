export declare class StateDriver {
    subIds: number;
    subscriptions: {};
    stateStore: {};
    actions: object;
    constructor(previousState: any);
    importStore(store: any): {};
    exportStore(): {};
    private throwErrorCheck;
    createStore(storeName: string, useHistory?: boolean): any;
    createStoreState(storeName: string, state: any): any;
    createAction(actionName: any, store: any, subStoreKey: any, isAsync: any, fn: any): void;
    getPreviousState(storeName: string, previousIndex: any): any;
    applyPreviousState(storeName: string): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: any): any;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(store: any, fn: any): () => void;
    unsubscribe(store: any, token: any): void;
    private eventHandler;
    private publish;
}
