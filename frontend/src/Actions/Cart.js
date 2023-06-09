import axios from "../AxiosConfig"

export const addItem=(id,quantity)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"addItemToCartRequest"})
        const url=`/product/${id}`;
        const {data}=await axios.get(url)
        console.log(data);
        dispatch({
            type:"addItemToCartSuccess",
            payload:{
                id: data.product._id,
                name: data.product.name,
                price: data.product.price,
                stock: data.product.Stock,
                images: data.product.images,
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
        let url = `/product/${id}`
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
        const url=`/product/${id}`
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
