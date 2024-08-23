export const initialState = {
  count: 0,
  productPrice: 0,
  cart: false,
  productImage: [], // Changed to match reducer
  productPrices: [], // Changed to match reducer
  productName: [], // Changed to match reducer
  quantities: [], // Changed to match reducer
  itemAddedPopUp: false,
  discountCard: false,
  basePrice: 0,
  products: [],
  discountCardShown: false,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "addProduct": {
      const { price, image, title } = action.payload;
      if (state.productName.includes(title)) {
        alert("Product is already in the cart");
        return state;
      }
      return {
        ...state,
        count: state.count + 1,
        productPrice: state.productPrice + price,
        productImage: [...state.productImage, image],
        productPrices: [...state.productPrices, price],
        productName: [...state.productName, title],
        quantities: [...state.quantities, 1],
        itemAddedPopUp: true,
      };
    }
    case "setProducts": {
      return {
        ...state,
        products: action.payload,
      };
    }
    case "hidePopUp": {
      return {
        ...state,
        itemAddedPopUp: false,
      };
    }
    case "showDiscountCard": {
      return {
        ...state,
        discountCard: true,
        discountCardShown: true,
      };
    }
    case "discountCardShowHide": {
      return {
        ...state,
        discountCard: !state.discountCard,
      };
    }
    case "showHideCartContainer": {
      return {
        ...state,
        cart: !state.cart, // toggle the cart container state
      };
    }
    case "increaseQuantity": {
      const updatedQuantities = [...state.quantities];
      updatedQuantities[action.payload.index] += 1;
      return calculatePrices({
        ...state,
        quantities: updatedQuantities,
        count: state.count + 1,
      });
    }
    case "decreaseQuantity": {
      const updatedQuantities = [...state.quantities];
      if (updatedQuantities[action.payload.index] > 1) {
        updatedQuantities[action.payload.index] -= 1;
        return calculatePrices({
          ...state,
          quantities: updatedQuantities,
          count: state.count - 1,
        });
      }
      return state;
    }
    case "deleteProduct": {
      const updatedImages = state.productImage.filter(
        (_, i) => i !== action.payload.index
      );
      const updatedPrices = state.productPrices.filter(
        (_, i) => i !== action.payload.index
      );
      const updatedNames = state.productName.filter(
        (_, i) => i !== action.payload.index
      );
      const updatedQuantities = state.quantities.filter(
        (_, i) => i !== action.payload.index
      );

      const removedQuantity = state.quantities[action.payload.index];

      return calculatePrices({
        ...state,
        productImage: updatedImages,
        productPrices: updatedPrices,
        productName: updatedNames,
        quantities: updatedQuantities,
        count: state.count - removedQuantity,
      });
    }

    default:
      return state;
  }
}

// You'll need to define this function or implement the price calculation logic here.
function calculatePrices(state) {
  // Calculate the updated prices for each product based on its quantity
  const updatedProductPrices = state.productPrices.map((price, index) => {
    return price * state.quantities[index];
  });

  // Calculate the total price of all items in the cart
  const totalProductPrice = updatedProductPrices.reduce(
    (total, price) => total + price,
    0
  );

  // Return the updated state with recalculated prices
  return {
    ...state,
    productPrice: totalProductPrice, // Update total cart price
  };
}
