"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";

function DiscountPopUp({ setDiscountCard, productPrice }) {
  return (
    <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="h-[60vh] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] border rounded-3xl p-4 sm:p-6 bg-gray-200">
        <div className="w-full flex justify-end">
          <button
            className="transform rotate-45"
            onClick={() => setDiscountCard(false)}
          >
            <FaPlus className="text-2xl sm:text-3xl" />
          </button>
        </div>
        <div className="h-full flex flex-col justify-center items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Yehhh
          </h2>
          <h3 className="text-5xl sm:text-6xl md:text-7xl pt-4">🎉🎊</h3>
          <h3 className="text-xl sm:text-2xl md:text-3xl flex items-center pt-6 gap-2">
            You get{" "}
            <span className="text-3xl sm:text-4xl md:text-5xl text-green-800">
              $200
            </span>
            of discount up to $2000
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DiscountPopUp;
