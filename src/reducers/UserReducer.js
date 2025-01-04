export const defaultUserState = {
  isLoggedIn: false,
  username: "",
  cart: [],
};

export const userAction = {
  login: "LOGIN",
  register: "REGISTER",
};

export function userReducer(state, action) {
  console.log("productReducer state, action:", state, action);
  switch (action.type) {
    case userAction.login: {
      // TODO: Login Logic
      return state;
    }
    case userAction.register: {
      // TODO: Register Logic
      return state;
    }

    default:
      throw Error("productReducer: unknown action:" + action.type);
  }
}
