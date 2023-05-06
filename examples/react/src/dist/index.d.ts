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
    createAction(actionName: any, store: any, subStoreKey: any, fn: any, isAsync?: boolean): void;
    getPreviousState(storeName: string, previousIndex: any): any;
    applyPreviousState(storeName: string): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: any): any;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(store: any, callbackFn: any): () => string;
    unsubscribe(store: any, subId: any): string;
    private eventHandler;
    private publish;
}
