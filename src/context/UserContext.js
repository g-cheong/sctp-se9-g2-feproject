import { createContext, useReducer } from "react";
import { defaultUserState, userAction, userReducer } from "../reducers/UserReducer";

const UserContext = createContext();

const dummy = {
  isLoggedIn: true,
  username: "Gabriel",
  cart: [
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 559,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 },
      quantity: 2,
      total: 5590,
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: { rate: 2.1, count: 430 },
      quantity: 3,
      total: 300,
    },
  ],
};

export function UserProvider({ children }) {
  const initialState = {
    ...defaultUserState,
    // uncomment dummy to use dummy data
    // ...dummy,
  };

  // const [state, dispatch] = useReducer(userReducer, defaultUserState);
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
    dispatch({ type: userAction.addToCart, payload: dummy.cart[0] });
  };
  const handlerRemoveFromCart = () => {
    dispatch({ type: userAction.removeFromCart });
  };
  const handlerAddProductToCart = () => {
    dispatch({ type: userAction.addProductToCart });
  };

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
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
export default UserContext;
