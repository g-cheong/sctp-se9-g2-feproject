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
  addProductToCart: "ADD_PRODUCT_TO_CART",
  checkoutCart: "CHECKOUT_CART",
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
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
            total: (product.quantity + 1) * product.price,
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
      const newCart = state.cart
        .map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity > 0 ? product.quantity - 1 : 0,
              total: (product.quantity - 1) * product.price,
            };
          }
          return product;
        })
        .filter((product) => product.quantity > 0);
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
    } //Add product to cart
    case userAction.addProductToCart: {
      const existingProduct = state.cart.find((product) => product.id === action.payload.product.id);
      let newState = { ...state };
      let productItem = {};
      if (existingProduct) {
        const updatedCart = state.cart.map((product) => {
          if (product.id === existingProduct.id) {
            const updatedTotal = parseFloat(product.total) + parseFloat(action.payload.priceTotal);
            return {
              ...product,
              quantity: product.quantity + action.payload.count,
              total: updatedTotal,
            };
          }
          return product;
        });
        newState.cart = updatedCart;
      } else {
        productItem = {
          id: action.payload.product.id,
          title: action.payload.product.title,
          price: action.payload.product.price,
          description: action.payload.product.description,
          image: action.payload.product.image,
          quantity: action.payload.count,
          total: parseFloat(action.payload.priceTotal),
        };
        newState.cart = [...state.cart, productItem];
      }
      return newState;
    }
    case userAction.checkoutCart: {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
