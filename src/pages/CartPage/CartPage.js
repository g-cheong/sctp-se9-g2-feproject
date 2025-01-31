import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_ACTION } from "../../redux/cartReducer";

import styles from "./CartPage.module.css";

import { CartCard } from "../../components/CartCard/CartCard";
import { CartNotLoggedInPage } from "./CartNotLoggedInPage";
import { CartEmptyPage } from "./CartEmptyPage";
import { CartBar } from "../../components/CartBar/CartBar";

import mockApi from "../../api/mockApi";

const DBupdateCart = async (userId, cart) => {
  try {
    const res = await mockApi.put(`/users/${userId}`, {
      cart: cart,
    });
    console.log("PUT response:", res);
  } catch (error) {
    console.log(error);
  }
};

function CartPage() {
  // declarations
  const user = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [cartWasCleared, setCartWasCleared] = useState(false);

  // useEffects
  useEffect(() => {
    //set title to cart
    document.title = "Mart | Cart";
  }, []);

  useEffect(() => {
    DBupdateCart(user.id, cart);
  }, [user.id, cart]);

  useEffect(() => {
    if (cartWasCleared && cart.length === 0) {
      setCartWasCleared(false);
      alert("Cart has been checked out!");
    }
  }, [cartWasCleared, cart.length]);

  // handler functions
  const handlerAddProduct = (productId) => {
    dispatch(CART_ACTION.addOneProduct({ id: productId }));
  };
  const handlerSubtractProduct = (productId) => {
    dispatch(CART_ACTION.deductOneProduct({ id: productId }));
  };
  const handlerRemoveFromCart = (productId) => {
    dispatch(CART_ACTION.removeProduct({ id: productId }));
  };

  const handlerCartCheckout = () => {
    // currently just removes items from cart as there's no checkout flow
    setCartWasCleared(true);
    dispatch(CART_ACTION.cartReset());
  };

  // early return checks
  if (!user.isLoggedIn) {
    return <CartNotLoggedInPage />;
  }

  if (!cart || cart.length === 0) {
    return <CartEmptyPage />;
  }

  // return statement
  return (
    <div className={styles.cartList}>
      <CartBar cart={cart} handlerCheckout={handlerCartCheckout} />
      {cart.map((product) => {
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
