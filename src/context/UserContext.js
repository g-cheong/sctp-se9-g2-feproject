import { createContext, useReducer } from "react";
import { defaultUserState, userAction, userReducer } from "../reducers/UserReducer";

const UserContext = createContext();

export function UserProvider({ children }) {
  const initialState = {
    // can be used to add dummy data if needed
    ...defaultUserState,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const handlerLogout = () => {
    dispatch({ type: userAction.logout });
  };
  const handlerAddProduct = () => {
    dispatch({ type: userAction.addProduct });
  };
  const handlerSubtractProduct = () => {
    dispatch({ type: userAction.subtractProduct });
  };
  const handlerAddToCart = () => {
    dispatch({ type: userAction.addToCart});
  };
  const handlerRemoveFromCart = () => {
    dispatch({ type: userAction.removeFromCart });
  };
  const handlerAddProductToCart = () => {
    dispatch({ type: userAction.addProductToCart });
  };
  const handlerCheckoutCart = () => {
    dispatch({type: userAction.checkoutCart})
  }

  const context = {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    cart: state.cart,
    id: state.id,
    dispatch,
    handlerLogout,
    handlerAddProduct,
    handlerSubtractProduct,
    handlerAddToCart,
    handlerRemoveFromCart,
    handlerAddProductToCart,
    handlerCheckoutCart,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
export default UserContext;
