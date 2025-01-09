import { useEffect, useState, useMemo } from "react";
//import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomePageView from "./HomePageView";
import mockApi from "../../api/mockApi";

//getSelectedProducts returns 5 products from the products array.
//Assumption: products array has atleast 5 products.[Min]
const getSelectedProducts = (products) => {
  let selectedProducts = [];
  if (products !== undefined && products.length > 0) {
    for (let i = 0; i < 5; i++) {
      selectedProducts.push(products[i]);
    }
    console.log("Getting selected Products..." + selectedProducts.length);
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
    //getProduct fetches the product only when user goes to homepage(once).
    getProducts();
  }, []);

  //getSelectedProducts is called only when products array changes.[Min]
  const selectedProducts = useMemo(() => getSelectedProducts(products), [products]);

  return (
    <div>
      <h1>Mart🛍️</h1>
      <SearchBar />
      <HomePageView selectedProducts={selectedProducts} />
    </div>
  );
}
export default HomePage;
