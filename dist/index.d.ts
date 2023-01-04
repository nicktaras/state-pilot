export declare class StateDriver {
    subIds: number;
    subscriptions: {};
    stateStore: {};
    constructor(previousState: any);
    importStore(store: any): {};
    exportStore(): {};
    createStore(storeName: string, useHistory: boolean): any;
    createStoreState(storeName: string, state: any): any;
    getPreviousState(storeName: string, previousIndex: any): any;
    getStoreState(storeName: string): any;
    getAllStoreStateHistory(storeName: any): any;
    getStoreStateHistory(storeName: string, startIndex: number, lastIndex: number): any;
    subscribe(topic: any, fn: any): () => void;
    unsubscribe(topic: any, token: any): void;
    private eventHandler;
    private publish;
}
