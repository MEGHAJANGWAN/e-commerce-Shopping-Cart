"use client";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import AddCart from "./AddCart";
import DiscountPopUp from "./Discount";
import CartContext from "@/contexts/CartContext";

function ProductCard() {
  const { state, dispatch } = useContext(CartContext);

  // To hide the pop-up after some time
  useEffect(() => {
    if (state.itemAddedPopUp) {
      const timer = setTimeout(() => {
        dispatch({ type: "hidePopUp" });
      }, 800);

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts or updates
    }
  }, [state.itemAddedPopUp, dispatch]);

  // Fetch products and update state
  useEffect(() => {
    async function downloadProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        // console.log(response.data);
        dispatch({type: "setProducts",
          payload: response.data
        })
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    downloadProducts();
  }, [dispatch]);

  // show discount card if product price is below or equal to 2000
 useEffect(() => {
   if (state.productPrice <= 2000 ) {
     dispatch({ type: "showDiscountCard" });
   }
 }, [state.productPrice, state.discountCardShown, dispatch]);

  return (
    <>
      {state.productPrice >= 2000
        ? state.discountCard && (
            <DiscountPopUp/>
          )
        : null}
      <div className="relative z-0">
        <AddCart/>
        <div className="h-20 w-full bg-green-500 mt-4 flex items-center justify-center text-white font-bold">
          <h2 className="text-3xl">Get $ 200 of discount upto $ 2000</h2>
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-6">
            {state.products.length > 0 ? (
              state.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-md shadow-slate-500 shadow-lg p-4 text-justify flex items-center flex-col "
                >
                  <div className="flex justify-center items-center mb-2">
                    <img
                      alt={product.title}
                      src={product.image}
                      loading="lazy"
                      className="h-32 w-32 sm:h-40 sm:40 object-contain"
                    />
                  </div>
                  <p className="font-medium text-center text-sm sm:text-base p-1 overflow-hidden">
                    {product.title.split(" ").length > 4
                      ? product.title.split(" ").slice(0, 3).join(" ") + "..."
                      : product.title}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center ">
                    <h4 className="font-bold text-lg text-black">
                      $ {product.price.toFixed(2)}
                    </h4>
                    <button
                      className="border rounded-lg p-2 bg-blue-600 text-white text-sm sm:text-base"
                      onClick={() =>
                        dispatch({
                          type: "addProduct",
                          payload: {
                            price: parseFloat(product.price),
                            image: product.image,
                            title: product.title,
                            id: product.id
                          },
                        })
                      
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
