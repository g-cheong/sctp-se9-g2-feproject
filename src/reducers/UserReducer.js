export const defaultUserState = {
  isLoggedIn: false,
  username: "",
  cart: [],
  id: null,
};

export const userAction = {
  login: "LOGIN",
  logout: "LOGOUT",
  addProduct: "ADD_PRODUCT",
  subtractProduct: "SUBTRACT_PRODUCT",
  addToCart: "ADD_TO_CART",
  removeFromCart: "REMOVE_FROM_CART",
};

export function userReducer(state, action) {
  console.log("productReducer state, action:", state, action);
  switch (action.type) {
    case userAction.login: {
      //payload has username and cart and id
      return {
        isLoggedIn: true,
        username: action.payload.username,
        cart: action.payload.cart,
        id: action.payload.id,
      };
    }
    case userAction.logout: {
      return defaultUserState;
    }
    case userAction.addProduct: {
      const newCart = state.cart.map((product) => {
        if(product.id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      return {
        ...state,
        cart: newCart,
      };
    }
    case userAction.subtractProduct: {
      const newCart = state.cart.map((product) => {
        if(product.id === action.payload.id){
          return {
            ...product,
            quantity: product.quantity > 0 ? product.quantity - 1 : 0,
          }
        }
        return product;
      })
      .filter((product) => product.quantity > 0);
      return {
        ...state,
        cart: newCart,
      };
    }
    case userAction.addToCart: {
      const newProduct = action.payload;
      const newCart = [...state.cart, newProduct];
      return {
        ...state,
        cart: newCart,
      };
    }
    case userAction.removeFromCart: {
      const newCart = state.cart.filter((product) => product.id !== action.payload.id);
      return {
        ...state,
        cart: newCart,
      };
    }
    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
