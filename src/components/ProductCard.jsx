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

  function addProduct(price, image) {
    setCount((prevCount) => prevCount + 1);
    setProductPrice((prevPrice) => prevPrice + price);
    setProductImage((prevImage) => [...prevImage, image]);
    setProductPrices((prevPrices) => [...prevPrices, price]); // add price
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
      />
      <div className="grid grid-cols-5 gap-6 m-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="h-80 w-60 bg-slate-300 flex items-center justify-center flex-col"
            >
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p>
                {product.title.length > 10
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </p>

              <div className="flex gap-2">
                <div>
                  <h4 className="">Price</h4>
                  <h4>$ {product.price.toFixed(2)}</h4>
                </div>
                <button
                  className="border rounded-lg p-2 bg-blue-600 text-white"
                  onClick={() =>
                    addProduct(parseFloat(product.price), product.image)
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
    </>
  );
}

export default ProductCard;
