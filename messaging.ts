export const STORE_ALREADY_EXISTS = "Store name already exists";
export const ACTION_ALREADY_EXISTS = "Action already exists";
export const STORE_DOESNT_EXIST = "Store doesn't exist";
export const STORE_HAS_NO_HISTORY = "Store has no history";
export const NO_PREVIOUS_STATE_EXISTS = "No previous state exists";
export const NO_SUB_ID_FOUND = "No subscription index found";
export const UNSUBSCRIBE_FROM_STORE_MESSAGE = (store: string, subId: number) => {
  return `unsubcribed from store ${store} with subscription id ${subId}`;
};
