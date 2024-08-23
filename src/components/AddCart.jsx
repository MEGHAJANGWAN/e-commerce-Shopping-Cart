"use client";
import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";
import CartContext from "@/contexts/CartContext";

// cart component 
function AddCart() {
  const { state,dispatch } = useContext(CartContext);
  return (
    <div className="sticky top-0 z-0">
      <div className="w-full flex items-center justify-end lg:flex-row px-4 py-2 bg-yellow-300 sm:px-10 lg:px-20">
        <button
          className="h-10 w-10 m-2 sm:m-4"
          onClick={() => 
            dispatch({
              type: "showHideCartContainer",
            })
          }
        >
          <FaShoppingCart className="h-full w-full" />
          {/* {console.log(productPrice, "PPPPPppp")} */}
        </button>

        <div className="flex items-center gap-10">
          <h2 className="text-2xl sm:text-3xl">{state.count}</h2>
          {/* format the productPrice to have three digits after the decimal point */}
          <h2 className="text-2xl sm:text-3xl">
            ${parseFloat(state.productPrice).toFixed(2)}
          </h2>
        </div>
      </div>
      <div className="w-full flex items-end justify-end pr-10 relative">
        {state.itemAddedPopUp && (
          <div
            className={`w-[15%] m-0 p-2 flex justify-center text-white bg-black absolute top-1 border rounded-md 
                      transition-opacity duration-500 ease-in-out 
                      ${state.itemAddedPopUp ? "opacity-100" : "opacity-0"}`}
          >
            <p>Item added</p>
          </div>
        )}
      </div>
      {state.cart && state.productImage.length > 0 ? (
        <>
          <div className="relative">
            <div className="absolute top-0 right-0 bg-white shadow-lg h-screen sm:h-[60vh] w-full sm:w-[25%] lg:w-[40%] overflow-y-auto p-4 sm:p-8">
              <ShoppingCart/>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddCart;
