"use client"
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";

function AddCart({
  count,
  productPrice,
  cart,
  setCart,
  productImage,
  setProductImage,
  setProductPrice,
  productPrices,
  setProductPrices,
  setCount,
}){
      // const [decreaseCount, setDecreaseCount] = useState("");

      // function handleDecreaseCount(){

      // }
  return (
    <div className="sticky top-0">
      <div>
        <div className="w-full flex justify-end items-center pr-20 bg-fuchsia-300  ">
          <button
            className="h-10 w-10 m-4"
            onClick={() => setCart((prevState) => !prevState)}
          >
            <FaShoppingCart className="h-full w-full" />
          </button>

          <div className="flex gap-10">
            <h2 className="text-3xl">{count}</h2>
            {/* format the productPrice to have three digits after the decimal point */}
            <h2 className="text-3xl">
              $ {parseFloat(productPrice).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
      {cart && productImage.length > 0 ? (
        <>
          <div className="relative flex justify-end items-end">
            <div className="absolute top-0 w-1/5 bg-yellow-300 pt-8">
              <ShoppingCart
                productImage={productImage}
                setProductImage={setProductImage}
                setProductPrice={setProductPrice}
                productPrices={productPrices}
                setProductPrices={setProductPrices}
                // handleDecreaseCount={handleDecreaseCount}
                setCount={setCount}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddCart;
