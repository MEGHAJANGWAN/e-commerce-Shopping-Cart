import React from "react";

function ShoppingCart({
  productImage,
  setProductImage,
  setProductPrice,
  productPrices,
  setProductPrices,
  setCount,
}) {
  function deleteProduct(i) {
    const updatedImages = productImage.filter((_, index) => i !== index);
    const removedPrice = productPrices[i];
    const updatedPrices = productPrices.filter((_, index) => i !== index);

    setProductImage(updatedImages);
    setProductPrice((prevPrice) => prevPrice - removedPrice);
    setProductPrices(updatedPrices);
    setCount((prevCount) => prevCount - 1);
  }
  return (
    <>
      <div className="w-20 ml-16">
        {productImage.map((image, i) => (
          <>
            <div key={i} className="pb-8 flex gap-10">
              <img src={image} alt="{`Product ${i + 1}`}" />
              <button className="text-3xl" onClick={() => deleteProduct(i)}>
                X
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ShoppingCart;
