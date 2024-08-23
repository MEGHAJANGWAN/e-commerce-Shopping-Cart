"use client"
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartContext from "@/contexts/CartContext";
import { cartReducer, initialState } from "@/reducers/CartReducer";
import { useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{state, dispatch}}>
    <Navbar/>
    <ProductCard/>
    </CartContext.Provider>
    
  );
}
