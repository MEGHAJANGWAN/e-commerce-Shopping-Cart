import React from "react";
import { FaPlus } from "react-icons/fa";

function ShoppingCart({
  productImage,
  setProductImage,
  setProductPrice,
  productPrices,
  setProductPrices,
  setCount,
  setProductName,
  productName,
}) {
  function deleteProduct(i) {
    const updatedImages = productImage.filter((_, index) => i !== index);
    const removedPrice = productPrices[i];
    const updatedPrices = productPrices.filter((_, index) => i !== index);
    const updatedNames = productName.filter((_, index) => i !== index);

    setProductImage(updatedImages);
    setProductPrice((prevPrice) => prevPrice - removedPrice);
    setProductPrices(updatedPrices);
    setCount((prevCount) => prevCount - 1);
    setProductName(updatedNames);
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
              <h3 className="text-md sm:text-lg font-medium">${productPrices[i].toFixed(2)}</h3>
              <h3 className="text-sm sm:text-base">
                {productName[i].split(" ").length > 4
                  ? productName[i].split(" ").slice(0, 3).join(" ") + "..."
                  : productName[i]}
              </h3>
            </div>
          </div>
            <button
              className="text-xl transform rotate-45 "
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
