import { useEffect, useState, useMemo } from "react";
import React, { useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReducer } from "react";
import mockApi from "../../api/mockApi";
import ProductPageView from "./ProductPageView";
import { defaultProduct, productReducer } from "../../reducers/ProductReducer";
import { userAction } from "../../reducers/UserReducer";
import UserContext from "../../context/UserContext";
/* import { fakeStoreApi } from "../../api/fakeStoreApi"; */
/* import axios from "axios"; */

function ProductPage() {
  const [state, dispatch] = useReducer(productReducer, defaultProduct);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedItemsToCart, setAddedItemsToCart] = useState(0);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  //Temporarily using StoreAPI for testing.[Min]
  /* const FAKESTORE_API_BASE_URL = "https://fakestoreapi.com";
  const fakeStoreApi = axios.create({
    baseURL: FAKESTORE_API_BASE_URL,
  }); */

  const getProduct = useCallback(async () => {
    try {
      //get the deails of product and set to product.(state)
      setIsLoaded(false);
      const res = await mockApi.get("/products/" + id);
      const singleProduct = res.data;
      if (singleProduct !== null && singleProduct !== undefined) {
        setProducts(singleProduct);
        setIsLoaded(true);
      }
      console.log("Running getProduct Function");
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    //set title to login
    document.title = "Mart 🛍️| Product";
    //getProduct fetches the product only when user goes to product(once).
    getProduct();
  }, [getProduct]);

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
      setIsCartUpdated(true);
    } else {
      navigate("/login");
    }
  };

  const handlerContinueShopping = () => {
    navigate("/");
  };
  //Update user cart back to Api.[Min]
  const updateUserCart = useCallback(async () => {
    if (userCtx.isLoggedIn && userCtx.id !== null) {
      try {
        await mockApi.patch(`/users/${userCtx.id}`, {
          cart: userCtx.cart,
        });
      } catch (error) {
        console.error("Failed to update user cart:", error);
      }
    }
  }, [userCtx.isLoggedIn, userCtx.id, userCtx.cart]);

  useEffect(() => {
    if (isCartUpdated) {
      updateUserCart();
      setIsCartUpdated(false);
    }
  }, [isCartUpdated, updateUserCart]);

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
        handlerContinueShopping={handlerContinueShopping}
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
