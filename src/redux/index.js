import { createStore } from "redux";
import cartItem from "../cart-items";
const initialState = {
  amount: 0,
  cart: cartItem,
  total: 0,
};
export const getTotal = () => {
  return {
    type: "TOTAL",
  };
};
export const toggleAmount = ({ id, toggle }) => {
  return {
    type: "TOGGLE_AMOUNT",
    payload: { id, toggle },
  };
};
export const increment = (id) => {
  return {
    type: "INCREMENT",
    payload: id,
  };
};
export const decrement = ({ id, amount }) => {
  return {
    type: "DECREMENT",
    payload: { id, amount },
  };
};
export const remove = (id) => {
  return {
    type: "REMOVE",
    payload: id,
  };
};
export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
const Reducer = (state, action) => {
  switch (action.type) {
    case "TOTAL":
      let { total, amount } = state.cart.reduce(
        (cartTotal, currentCartItem) => {
          const { price, amount } = currentCartItem;
          cartTotal.amount += amount;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          }
          return item;
        }),
      };
    case "DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
          return item;
        }),
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "TOGGLE_AMOUNT":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            const toggleAmount = action.payload.toggle === "inc" ? 1 : -1;
            return {
              ...item,
              amount: item.amount + 1 * toggleAmount,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
export const store = createStore(Reducer, initialState);
