import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { useContext, useEffect } from "react";

import UserContext from "../../context/UserContext";
import { userAction } from "../../reducers/UserReducer";
import styles from "./CartPage.module.css";
import mockApi from "../../api/mockApi";

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
  const userCtx = useContext(UserContext);

  useEffect(() =>{
    DBupdateCart(userCtx.id, userCtx.cart);
  }, [userCtx.cart, userCtx.id]);

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

  console.log("UserContext:", userCtx);

  if (!userCtx.isLoggedIn) {
    return <CartNotLoggedInPage />;
  }

  if (!userCtx.cart || userCtx.cart.length === 0) {
    return <CartEmptyPage />;
  }

  return (
    <div className={styles.cartList}>
      <section className={styles.totalSection}>
        <h1>
          Cart Total: $
          {userCtx.cart.reduce((acc, product) => {
            return acc + product.total;
          }, 0)}
        </h1>
      </section>
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
