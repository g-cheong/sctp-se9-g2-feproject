import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { useContext } from "react";

import UserContext from "../../context/UserContext";
import { userAction } from "../../reducers/UserReducer";


function CartPage() {
  const userCtx = useContext(UserContext); 

  const handlerAddProduct = () => {
    return (
      userCtx.dispatch({type: userAction.addProduct})
    );
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
              return <CartCard key={product.id} product={product}></CartCard>;
            })
          }
    </div>
  );
}
export default CartPage;
