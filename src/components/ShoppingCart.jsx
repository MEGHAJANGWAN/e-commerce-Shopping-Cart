import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

function ShoppingCart({
  productImage,
  setProductImage,
  setProductPrice,
  productPrices,
  setProductPrices,
  setCount,
  setProductName,
  productName,
  setQuantity,
  quantity,
}) {
  // Function to increase the quantity of a product
  function increaseQuantity(index) {
    const updatedQuantities = [...quantity];
    updatedQuantities[index] = parseInt(updatedQuantities[index], 10) + 1;
    setQuantity(updatedQuantities);

    // Update total price
    const updatedPrices = [...productPrices];
    const newTotalPrice = updatedPrices.reduce((acc, price, idx) => {
      return acc + price * updatedQuantities[idx];
    }, 0);

    setProductPrice(newTotalPrice);

    // Update total product count
    setCount((prevCount) => prevCount + 1);
  }

  // Function to decrease the quantity of a product
  function decreaseQuantity(index) {
    const updatedQuantities = [...quantity];
    const currentQuantity = parseInt(updatedQuantities[index], 10);
    if (currentQuantity > 1) {
      updatedQuantities[index] = currentQuantity - 1;
      setQuantity(updatedQuantities);

      // Update total price
      const updatedPrices = [...productPrices];
      const newTotalPrice = updatedPrices.reduce((acc, price, idx) => {
        return acc + price * updatedQuantities[idx];
      }, 0);
      setProductPrice(newTotalPrice);

      // Update total product count
      setCount((prevCount) => prevCount - 1);
    }
  }

  // Function to delete a product from the cart
  function deleteProduct(index) {
    const updatedImages = productImage.filter((_, i) => index !== i);
    const removedQuantity = quantity[index];
    const removedPrice = productPrices[index] * removedQuantity;
    const updatedPrices = productPrices.filter((_, i) => index !== i);
    const updatedNames = productName.filter((_, i) => index !== i);
    const updatedQuantities = quantity.filter((_, i) => index !== i);

    setProductImage(updatedImages);
    setProductPrices(updatedPrices);
    setProductName(updatedNames);
    setQuantity(updatedQuantities);
    setProductPrice((prevPrice) => prevPrice - removedPrice);
    setCount((prevCount) => prevCount - removedQuantity);
  }

  return (
    <div className="max-h-full overflow-y-auto flex flex-col items-center">
      {productImage.map((image, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row justify-evenly items-center w-full max-w-xl p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <h2>{i + 1}</h2>
          <img
            src={image}
            alt={`Product ${i + 1}`}
            className="w-16 h-16 object-contain"
          />
          <div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-md sm:text-lg font-medium">
                ${productPrices < 1 ? 0.0 : productPrices[i].toFixed(2)}
              </h3>
              <h3 className="text-sm sm:text-base">
                {productName[i].split(" ").length > 4
                  ? productName[i].split(" ").slice(0, 3).join(" ") + "..."
                  : productName[i]}
              </h3>
            </div>
          </div>
          <div className="border border-black rounded-lg p-2 flex items-center gap-4">
            <p>Qty: {quantity[i]}</p>
            <div className="flex flex-col gap-1">
              <button
                className="border border-black rounded-sm"
                onClick={() => increaseQuantity(i)}
              >
                <MdOutlineArrowDropUp />
              </button>
              <button
                className="border border-black rounded-sm"
                onClick={() => decreaseQuantity(i)}
              >
                <MdOutlineArrowDropDown />
              </button>
            </div>
          </div>
          <button
            className="text-xl transform rotate-45"
            onClick={() => deleteProduct(i)}
          >
            <FaPlus />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
