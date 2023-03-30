import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from './Reducers/User'
import { ProductReducers } from './Reducers/Product';
import { OrderReducers } from './Reducers/Order';
import { cartReducers } from './Reducers/Cart';
const store = configureStore({
    reducer:{
        user: userReducer,
        product:ProductReducers,
        order: OrderReducers,
        cart:cartReducers
    }
})

export default store;