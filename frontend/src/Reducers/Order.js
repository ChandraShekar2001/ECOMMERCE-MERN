import {createReducer} from '@reduxjs/toolkit'

const initialState={

    loading: true,
    error: null,
    orders:{},
    isDeleted: false,
    order: {},
    isCreated:true,
    isUpdated: false,

}

export const OrderReducers=createReducer(initialState,{

    //allOrdersSlice Reducers
    allOrdersRequest(state) {
        state.loading = true;
    },

    allOrdersSuccess(state, action) {
        state.loading = false;
        state.orders = action.payload
    },    
    allOrdersFail(state, action) {
        state.loading = false;
        state.error = action.payload
    },
    allOrdersReset(state) {
        state.error = null
        state.isDeleted = false;
        state.isCreated = false;
        state.isUpdated = false;
    },

    //deleteOrderSlice Reducers
    deleteOrderRequest(state) {
        state.loading = true;
    },
    deleteOrderSuccess(state, action) {
        state.loading = false;
        state.isDeleted = true
        state.orders=action.payload
    },
    deleteOrderfail(state, action) {
        state.loading = false;
        state.error = action.payload
    },
    deleteOrderReset(state) {
        state.error = null;
        state.isDeleted = false;
    },

    //getOrderSlice Reducers
    getOrderRequest(state) {
        state.loading = true;
    },

    getOrderSuccess(state, action) {
        state.loading = false
        state.order = action.payload
    },
    getOrderFail(state, action) {
        state.loading = false;
        state.error = action.payload
    },
    getOrderReset(state) {
        state.error = null;
    },

    //myOrderSLice Reducers
    myOrderRequest(state) {
        state.loading = true;  
        state.orders = {}
    },
    myOrderSuccess(state, action) {
        state.orders = action.payload
        state.loading = false
    },
    myOrderFail(state, action) {
        state.loading = false;
        state.error = action.payload
    },
    myOrderReset(state) {
        state.error = null;
    },

    //orderSlice Reducers
    createOrderRequest(state) {
        state.loading = true;
    },

    createOrderSuccess(state, action) {
        state.loading = false;
        state.isCreated = true;
        state.order=action.payload
    },
    createOrderFail(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    createOrderReset(state) {
        state.error = null;
    },

    //updateOrderSlice Reducers
    updateOrderRequest(state) {
        state.loading = true;
    },
    updateOrderSuccess(state, action) {
        state.loading = false;
        state.isUpdated = true;
        // state.orders=action.payload
    },
    updateOrderfail(state, action) {
        state.loading = false;
        state.error = action.payload
    },
    updateOrderReset(state) {
        state.isUpdated = false;
        state.error = null;
    },

})