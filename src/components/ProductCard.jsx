"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCart from "./AddCart";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [cart, setCart] = useState(false);
  const [productImage, setProductImage] = useState([]);
  const [productPrices, setProductPrices] = useState([]); // store prices
  const [productName, setProductName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [itemAddedPopUp, setItemAddedPopUp] = useState(false);
  function addProduct(price, image, title) {
    if(productName.includes(title)) {
      alert("Product is already in the cart");
      return;
    }
    setCount((prevCount) => prevCount + 1);
    setProductPrice((prevPrice) => prevPrice + price);
    setProductImage((prevImage) => [...prevImage, image]);
    setProductPrices((prevPrices) => [...prevPrices, price]); // add price
    setProductName((prevName) => [...prevName, title]);
    setQuantity((prevQuantity) => [...prevQuantity, 1])
    setItemAddedPopUp(true);

    setTimeout(() => {
      setItemAddedPopUp(false);
    }, 800);
  }

  useEffect(() => {
    async function downloadProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);

        setProducts(response.data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    downloadProducts();
  }, []);

  return (
    <>
      <div className="relative z-0">
        <AddCart
          addProduct={addProduct}
          count={count}
          productPrice={productPrice}
          cart={cart}
          setCart={setCart}
          productImage={productImage}
          setProductImage={setProductImage}
          setProductPrice={setProductPrice}
          productPrices={productPrices}
          setProductPrices={setProductPrices}
          setCount={setCount}
          productName={productName}
          setProductName={setProductName}
          itemAddedPopUp={itemAddedPopUp}
          setItemAddedPopUp={setItemAddedPopUp}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <div className="flex items-center justify-center flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-md shadow-slate-500 shadow-lg p-4 text-justify flex items-center flex-col "
                >
                  <div className="flex justify-center items-center mb-2">
                    <img
                      src={product.image}
                      alt={product.title}
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
                        addProduct(
                          parseFloat(product.price),
                          product.image,
                          product.title,
                          product.id
                        )
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
