import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { useContext } from "react";

import UserContext from "../../context/UserContext";
import { userAction } from "../../reducers/UserReducer";


function CartPage() {
  const userCtx = useContext(UserContext); 

  const handlerAddProduct = (productId) => {
    return (
      userCtx.dispatch({
        type: userAction.addProduct,
        payload: {id: productId},
      }));
  };
  const handlerSubtractProduct = (productId) => {
    return (
      userCtx.dispatch({
        type: userAction.subtractProduct,
        payload: {id: productId},
      }));
  };
  const handlerRemoveFromCart = (productId) => {
    return (
      userCtx.dispatch({
        type: userAction.removeFromCart,
        payload: {id: productId},
      }));
  };

  console.log("UserContext:", userCtx);

  if(!userCtx.isLoggedIn) {
    return <CartNotLoggedInPage/>;
  } 

  if(!userCtx.cart || userCtx.cart.length === 0) {
    return <CartEmptyPage/>;
  }

  return (
    <div>
          { 
            userCtx.cart.map((product) => {
              return (
                <CartCard 
                  key={product.id} 
                  product={product}
                  handlerAddProduct={handlerAddProduct}
                  handlerSubtractProduct={handlerSubtractProduct}
                  handlerRemoveFromCart={handlerRemoveFromCart}
                />
              );
            })
          }
    </div>
  );
}
export default CartPage;
