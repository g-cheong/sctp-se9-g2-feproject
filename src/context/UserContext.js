import { createContext, useReducer } from "react";
import {
  defaultUserState,
  userAction,
  userReducer,
} from "../reducers/UserReducer";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, defaultUserState);

  const handlerLogout = () => {
    dispatch({ type: userAction.logout });
  };

  const context = {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    cart: state.cart,
    id: state.id,
    dispatch,
    handlerLogout,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
export default UserContext;
