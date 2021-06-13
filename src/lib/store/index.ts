import {createContext} from 'react';
import Store from './store';


export const StoreContext = createContext<Store>(null!);

export {Store};
export {default as CreateTransactionStore} from './create-transaction';