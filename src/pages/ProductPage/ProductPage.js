import React from "react";
import { useParams } from "react-router-dom";
import { fakeStoreApi } from "../../api/fakeStoreApi";
import ProductPageView from "./ProductPageView";
import { useEffect, useState, useMemo } from "react";
import { useReducer } from "react";
import { defaultProduct, productReducer } from "../../reducers/ProductReducer";
import { defaultUserState, userReducer } from "../../reducers/UserReducer";

function ProductPage() {
  const [state, dispatch] = useReducer(productReducer, defaultProduct);
  const [user, userDispatch] = useReducer(userReducer, defaultUserState);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); 

  const getProduct = async () => {
    try {
      //get the deails of product and set to product.(state)
      setIsLoaded(false);
      const res = await fakeStoreApi.get("/products/" + id);
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
    userDispatch({ type: "ADD_PRODUCT_TO_CART", payload: { product: products, count: state.count,
      priceTotal: (state.count * products.price).toFixed(2)
      } });
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
        addedToCart={user.cart}
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
