import CartContext from "@/contexts/CartContext";
import React, { createContext, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

function ShoppingCart() {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className="max-h-full overflow-y-auto flex flex-col items-center">
      {state.productImage.map((image, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row justify-evenly items-center w-full max-w-xl p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <h2>{i + 1}</h2>
          <img
            src={image}
            alt={`Product ${i + 1}`}
            loading="lazy"
            className="w-16 h-16 object-contain"
          />
          <div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-md sm:text-lg font-medium">
                ${state.productPrices < 1 ? 0.0 : state.productPrices[i].toFixed(2)}
              </h3>
              <h3 className="text-sm sm:text-base">
                {state.productName[i].split(" ").length > 4
                  ? state.productName[i].split(" ").slice(0, 3).join(" ") + "..."
                  : state.productName[i]}
              </h3>
            </div>
          </div>
          <div className="border border-black rounded-lg p-2 flex items-center gap-4">
            <p>Qty: {state.quantities[i]}</p>
            <div className="flex flex-col gap-1">
              <button
                className="border border-black rounded-sm"
                onClick={() =>
                  dispatch({
                    type: "increaseQuantity",
                    payload: { index: i },
                  })
                }
              >
                <MdOutlineArrowDropUp />
              </button>
              <button
                className="border border-black rounded-sm"
                onClick={() =>
                  dispatch({
                    type: "decreaseQuantity",
                    payload: { index: i },
                  })
                }
              >
                <MdOutlineArrowDropDown />
              </button>
            </div>
          </div>
          <button
            className="text-xl transform rotate-45"
            onClick={() =>
              dispatch({
                type: "deleteProduct",
                payload: { index: i },
              })
            }
          >
            <FaPlus />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
