export const defaultUserState = {
  isLoggedIn: false,
  username: "",
  cart: [],
};

export const userAction = {
  login: "LOGIN",
  logout: "LOGOUT",
};

export function userReducer(state, action) {
  console.log("productReducer state, action:", state, action);
  switch (action.type) {
    case userAction.login: {
      // TODO: Login Logic
      return action.payload;
    }
    case userAction.logout: {
      return defaultUserState;
    }

    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
