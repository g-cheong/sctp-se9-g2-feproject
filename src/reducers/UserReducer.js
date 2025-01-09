export const defaultUserState = {
  isLoggedIn: false,
  username: "",
  cart: [],
  id: null,
};

export const userAction = {
  login: "LOGIN",
  logout: "LOGOUT",
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

    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
