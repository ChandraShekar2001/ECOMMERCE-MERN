import axios from 'axios'

export const addItem=(id,quantity)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"addItemToCartRequest"})
        const url=`http://localhost:4000/api/v1/product/${id}`;
        const {data}=await axios.get(url)
        console.log(data);
        dispatch({
            type:"addItemToCartSuccess",
            payload:{
                id: data.product._id,
                name: data.product.name,
                price: data.product.price,
                stock: data.product.Stock,
                quantity
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    }catch(error){
        dispatch({
            type:"addItemToCartFail",
            payload:error.message,
        })
    }
}

export const removeItem=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"removeItemRequest"});
        let url = `http://localhost:4000/api/v1/product/${id}`
        const {data}=await axios.get(url)
        console.log(data);
        dispatch({
            type:"removeItemSuccess",
            payload:{
                    id: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    stock: data.product.Stock,
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(error){
        console.log(error);
        dispatch({
            type:"removeItemFail",
            payload:error.message
        })
    }
}

export const removeCompleteItem=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"removeCompleteCartItemRequest"})
        const url=`http://localhost:4000/api/v1/product/${id}`
        const {data}=await axios.get(url);
        console.log(data);
        dispatch({
            type:"removeCompleteCartItemSuccess",
            payload:{
                id: data.product._id,
                name: data.product.name,
                price: data.product.price,
                stock: data.product.Stock,            
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));      
    }catch(error){
        console.log(error);
        dispatch({
            type:"removeCompleteCartItemFail",
            payload:error.message
        })

    }
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({type:"saveShippingInfo", payload:data});
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
