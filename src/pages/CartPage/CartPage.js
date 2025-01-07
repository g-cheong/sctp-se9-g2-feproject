/*
TODO: Gabriel
If user is not login, navigate to loginpage with message "Please login to view cart".
use <Navigate/>

If user is login and no item in cart, display CartEmpty component.
use !user.isLoggedIn return <CartEmpty/>

If user is login display items in CartCard component from user.cart useContext.
*/

import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { useContext } from "react";

import UserContext from "../../context/UserContext";

function CartPage() {
  const userCtx = useContext(UserContext); 

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
