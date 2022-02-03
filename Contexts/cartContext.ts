import CreateContext from "./CreateContext";
import { cartProduct } from "../interfaces/interfaces";

const reducer = (
  state: { cartProducts: cartProduct[]; total: number; user: any },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "add_cart": {
      //check if cart is empty
      if (!state.cartProducts || !state.cartProducts.length) {
        //it is empty, then make an array of cart product
        state.cartProducts = [];
        //add the product to it
        state.cartProducts.push(action.payload);
      } else {
        //it's not empty
        //loop through the products and find the one we just added
        console.log(state.cartProducts);

        state.cartProducts.push(action.payload);
      }

      return { ...state };
    }
    case "remove_cart": {
      for (let index = 0; index < state.cartProducts.length; index++) {
        if (state.cartProducts[index].id === action.payload.id) {
          state.cartProducts.splice(index, 1);
        }
      }
      return { ...state };
    }
    case "change_quantity": {
      for (let index = 0; index < state.cartProducts.length; index++) {
        if (state.cartProducts[index].id === action.payload.id) {
          state.cartProducts[index].quantity = action.payload.quantity;
        }
      }
      return { ...state };
    }
    case "user": {
      state.user = action.payload;
      console.log(action.payload);
      return { ...state };
    }
    case "reset_cart": {
      state.cartProducts = [];
      return { ...state };
    }
  }
};
//functions
const addProductToCart = (dispatch: any) => {
  return (action: { payload: cartProduct }) => {
    dispatch({
      type: "add_cart",
      payload: action.payload,
    });
  };
};
const removeProductFromCart = (dispatch: any) => {
  return (action: { payload: cartProduct }) => {
    dispatch({
      type: "remove_cart",
      payload: action.payload,
    });
  };
};
const changeQuantityOfProduct = (dispatch: any) => {
  return (action: { payload: cartProduct }) => {
    dispatch({
      type: "change_quantity",
      payload: action.payload,
    });
  };
};
const userState = (dispatch: any) => {
  return (action: { payload: cartProduct }) => {
    dispatch({
      type: "user",
      payload: action.payload,
    });
  };
};

const resetCart = (dispatch: any) => {
  return () => {
    dispatch({
      type: "reset_cart",
    });
  };
};
export const { Provider, Context } = CreateContext(
  reducer,
  {
    addProductToCart,
    removeProductFromCart,
    changeQuantityOfProduct,
    userState,
    resetCart,
  },
  {}
);
