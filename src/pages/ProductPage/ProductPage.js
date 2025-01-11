import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
/* import { fakeStoreApi } from "../../api/fakeStoreApi"; */
import mockApi from "../../api/mockApi";
import ProductPageView from "./ProductPageView";
import { useEffect, useState, useMemo } from "react";
import { useReducer } from "react";
import { defaultProduct, productReducer } from "../../reducers/ProductReducer";
import { userAction } from "../../reducers/UserReducer";
/* import axios from "axios"; */
import UserContext from "../../context/UserContext";

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

function ProductPage() {
  const [state, dispatch] = useReducer(productReducer, defaultProduct);
  // const [user, userDispatch] = useReducer(userReducer, defaultUserState);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedItemsToCart, setAddedItemsToCart] = useState(0);
  //Temporarily using StoreAPI for testing.[Min]
  /* const FAKESTORE_API_BASE_URL = "https://fakestoreapi.com";
  const fakeStoreApi = axios.create({
    baseURL: FAKESTORE_API_BASE_URL,
  }); */

  useEffect(() => {
    DBupdateCart(userCtx.id, userCtx.cart);
  }, [userCtx.cart, userCtx.id]);

  const getProduct = async () => {
    try {
      //get the deails of product and set to product.(state)
      setIsLoaded(false);
      const res = await mockApi.get("/products/" + id);
      const singleProduct = res.data;
      if (singleProduct !== null && singleProduct !== undefined) {
        setProducts(singleProduct);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getProduct fetches the product only when user goes to product(once).
    getProduct();
  }, []);

  const handlerPlus = () => {
    dispatch({ type: "PLUS_COUNT" });
  };

  const handlerMinus = () => {
    dispatch({ type: "MINUS_COUNT" });
  };

  const handlerAddToCart = () => {
    if (userCtx.isLoggedIn && userCtx.id !== null) {
      userCtx.dispatch({
        type: userAction.addProductToCart,
        payload: { product: products, count: state.count, priceTotal: (state.count * products.price).toFixed(2) },
      });
      setAddedItemsToCart(state.count);
      updateUserCart();
    } else {
      navigate("/login");
    }
  };

  const updateUserCart = async () => {
    if (userCtx.isLoggedIn && userCtx.id !== null) {
      try {
        await mockApi.patch(`/users/${userCtx.id}`, {
          cart: userCtx.cart,
        });
      } catch (error) {
        console.error("Failed to update user cart:", error);
      }
    }
  };

  const calculatePriceTotal = useMemo(() => {
    return state.count * products.price;
  }, [state.count, products.price]);

  return (
    <div>
      <ProductPageView
        products={products}
        handlerMinus={handlerMinus}
        count={state.count}
        handlerPlus={handlerPlus}
        priceTotal={calculatePriceTotal.toFixed(2)}
        handlerAddToCart={handlerAddToCart}
        isLoaded={isLoaded}
        addedItemsToCart={addedItemsToCart}
      />
    </div>
  );
}
export default ProductPage;
/*
TODO: MIN
when user click card route to (/product/:id)
use <Link/>

get the product by id from the fakeStoreAPI using useEffect
useParam to get id
useEffect and axios API call(refer to ProductPage). store res in product useState

display product details

TODO: MIN/FIRHAT
user able to add quantity and total price is displayed.
user able to add to cart and it is saved to the reducer.
*/
