import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { useContext, useEffect, useState } from "react";

import UserContext from "../../context/UserContext";
import { userAction } from "../../reducers/UserReducer";
import styles from "./CartPage.module.css";
import mockApi from "../../api/mockApi";
import { CartBar } from "../../components/CartBar/CartBar";

const DBupdateCart = async (userId, cart) => {
  try {
    const res = await mockApi.patch(`/users/${userId}`, {
      cart: cart,
    });
    console.log("PATCH response:", res);
  } catch (error) {
    console.log(error);
  }
};

function CartPage() {
  // declarations
  const userCtx = useContext(UserContext);
  const [cartWasCleared, setCartWasCleared] = useState(false);

  // useEffects
  useEffect(() => {
    //set title to cart
    document.title = "Mart | Cart";
  }, []);

  useEffect(() => {
    DBupdateCart(userCtx.id, userCtx.cart);
  }, [userCtx.id, userCtx.cart]);

  useEffect(() => {
    if (cartWasCleared && userCtx.cart.length === 0) {
      setCartWasCleared(false);
      alert("Cart has been checked out!");
    }
  }, [cartWasCleared, userCtx.cart.length]);

  // handler functions
  const handlerAddProduct = (productId) => {
    return userCtx.dispatch({
      type: userAction.addProduct,
      payload: { id: productId },
    });
  };
  const handlerSubtractProduct = (productId) => {
    return userCtx.dispatch({
      type: userAction.subtractProduct,
      payload: { id: productId },
    });
  };
  const handlerRemoveFromCart = (productId) => {
    return userCtx.dispatch({
      type: userAction.removeFromCart,
      payload: { id: productId },
    });
  };

  const handlerCartCheckout = () => {
    // currently just removes items from cart as there's no checkout flow
    setCartWasCleared(true);
    return userCtx.dispatch({
      type: userAction.checkoutCart,
    });
  };

  // early return checks
  if (!userCtx.isLoggedIn) {
    return <CartNotLoggedInPage />;
  }

  if (!userCtx.cart || userCtx.cart.length === 0) {
    return <CartEmptyPage />;
  }

  // return statement
  return (
    <div className={styles.cartList}>
      <CartBar cart={userCtx.cart} handlerCheckout={handlerCartCheckout} />
      {userCtx.cart.map((product) => {
        return (
          <CartCard
            key={product.id}
            product={product}
            handlerAddProduct={handlerAddProduct}
            handlerSubtractProduct={handlerSubtractProduct}
            handlerRemoveFromCart={handlerRemoveFromCart}
          />
        );
      })}
    </div>
  );
}
export default CartPage;
