import { createContext, useReducer } from "react";
import { defaultUserState, userAction, userReducer } from "../reducers/UserReducer";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, defaultUserState);

  const handlerLogin = (userLoginDetails) => {
    // Login Logic
    dispatch({ type: userAction.login, payload: userLoginDetails });
  };

  const handlerRegister = (userRegisterDetails) => {
    // Register Logic
    dispatch({ type: userAction.register, payload: userRegisterDetails });
  };

  const context = {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    cart: state.cart,
    handlerLogin,
    handlerRegister,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
export default UserContext;
