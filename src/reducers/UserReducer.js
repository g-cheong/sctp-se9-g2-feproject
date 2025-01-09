export const defaultUserState = {
  isLoggedIn: false,
  username: "",
  cart: [],
};

export const userAction = {
  login: "LOGIN",
  logout: "LOGOUT",
  addProductToCart: "ADD_PRODUCT_TO_CART",
};

export function userReducer(state, action) {
  console.log("productReducer state, action:", state, action);
  switch (action.type) {
    case userAction.login: {
      //payload has username and cart
      return {
        isLoggedIn: true,
        username: action.payload.username,
        cart: action.payload.cart,
      };
    }
    case userAction.logout: {
      return defaultUserState;
    }
    //Add product to cart[Min]
    case userAction.addProductToCart: {
      let newState = { ...state };     
      const productItem = {
        id: action.payload.product.id,
        title: action.payload.product.title,
        price: action.payload.product.price,
        description: action.payload.product.description,
        image: action.payload.product.image,
        quantity: action.payload.count,
        total: action.payload.priceTotal,
      };
      newState.cart = [...state.cart, productItem];
      return newState;
    }

    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
