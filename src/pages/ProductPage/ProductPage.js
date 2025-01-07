import React from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>This is Product Page</h1>
      <p>Product ID: {id}</p>
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
