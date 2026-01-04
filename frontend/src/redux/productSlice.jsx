import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
const initialstate = {
    productList: [],
    cartItem:[],
    searchQuery: ""
}
export const productSlice=createSlice({
 name:"product",
 initialState:initialstate,
 reducers:{
    setDataproduct:(state,action)=>{
       console.log(action);
       state.productList=[...action.payload]
    },
    addCartItem:(state,action)=>{
      const check=state.cartItem.some((el)=>el._id===action.payload._id)
      
       if(check){
         toast('Already Item in cart')
       }else{
         toast('Item add succesfully')
         const total=action.payload.price
         state.cartItem=[...state.cartItem,{...action.payload,qty:1,total:total},]
       }  
    },
    deleteCartItem:(state,action)=>{
     
      toast('one item delete')
        const index=state.cartItem.findIndex((el)=>el._id===action.payload)
        state.cartItem.splice(index,1)
      
    },
    increaqty:(state,action)=>{
      const index=state.cartItem.findIndex((el)=>el._id===action.payload)
      let qty=state.cartItem[index].qty
      const qtyInc=++qty
      state.cartItem[index].qty=qtyInc;
      const price=state.cartItem[index].price
      const total=price*qtyInc
      state.cartItem[index].total=total
    },
    decreaqty:(state,action)=>{
      const index=state.cartItem.findIndex((el)=>el._id===action.payload)
      let qty=state.cartItem[index].qty
      
      if(qty>1){
         const qtyDec=--qty
         state.cartItem[index].qty=qtyDec;
         const price=state.cartItem[index].price
      const total=price*qtyDec
      state.cartItem[index].total=total
      }
      
    },
    setSearchQuery:(state,action)=>{
      state.searchQuery=action.payload
    }
 }
})

export const { setDataproduct ,addCartItem,deleteCartItem,increaqty,decreaqty,setSearchQuery} = productSlice.actions;
export default productSlice.reducer

