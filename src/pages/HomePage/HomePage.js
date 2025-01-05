import { useEffect, useState } from "react";
import { fakeStoreApi } from "../../api/fakeStoreApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      //get 20 products and set to products(state)
      const res = await fakeStoreApi.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getProduct fetches the product only when user goes to homepage(once).
    getProducts();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      <SearchBar />
      <div className="productList">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
