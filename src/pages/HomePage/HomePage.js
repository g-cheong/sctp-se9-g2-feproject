import { useEffect, useState, useMemo } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import HomePageView from "./HomePageView";
import mockApi from "../../api/mockApi";

//getSelectedProducts returns 5 products from the products array.
//Assumption: products array has atleast 5 products.
const getSelectedProducts = (products) => {
  let selectedProducts = [];
  if (products !== undefined && products.length > 0) {
    for (let i = 0; i < Math.min(products.length, 5); i++) {
      selectedProducts.push(products[i]);
    }
  }
  return selectedProducts;
};

function HomePage() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      //get 20 products and set to products(state)
      const res = await mockApi.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //set title to home
    document.title = "Mart | Home";
    //getProduct fetches the product only when user goes to homepage(once).
    getProducts();
  }, []);

  //getSelectedProducts is called only when products array changes.[Min]
  const selectedProducts = useMemo(() => getSelectedProducts(products), [products]);

  return (
    <div>
      <p>This is the release version.</p>
      <SearchBar />
      <HomePageView selectedProducts={selectedProducts} />
    </div>
  );
}
export default HomePage;
