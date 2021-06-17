import {createContext} from 'react';
import Store from './store';


export const StoreContext = createContext<Store>(null!);

export * from './inputs';
export {Store};
export {default as Transaction} from './transaction';
export type {StoringParams as TransactionStoringParams} from './transaction';