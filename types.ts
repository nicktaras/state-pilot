export type StateAction = {
  name: string;
  store: string;
  subStoreKey: string;
  fn: any;
  isAsync: boolean;
};
