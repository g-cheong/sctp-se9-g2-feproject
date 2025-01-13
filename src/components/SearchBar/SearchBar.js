import { useState } from "react";
import { dummyProductData } from "../../dummydata/dummyProductData";
import styles from "./SearchBar.module.css";
import Fuse from "fuse.js";
import RecommendList from "../RecommendList/RecommendList";
import ProductList from "../ProductList/ProductList";
import mockApi from "../../api/mockApi";

const initialSearchState = {
  searchInput: "",
  prevSearch: "",
  isHidden: true,
  searchProducts: [],
  searchError: "",
};

function SearchBar() {
  const [search, setSearch] = useState(initialSearchState);
  // const [search, setSearch] = useState("");
  // const [prevSearch, setPrevSearch] = useState("");
  // const [isHidden, setIsHidden] = useState(true);
  // const [searchError, setSearchError] = useState("");
  // const [searchProducts, setSearchProducts] = useState([]);

  const options = {
    // isCaseSensitive: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.4,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    includeScore: true,
    keys: ["title"],
  };

  const fuse = new Fuse(dummyProductData, options);
  const result = fuse.search(search.searchInput);
  const topFiveResult = result.slice(0, 5);
  console.log(result);
  console.log(topFiveResult);

  const handlerSearch = () => {
    const getSearchProducts = async () => {
      setSearch((prevState) => ({
        ...prevState,
        searchError: "",
      }));
      // setSearchError("");
      try {
        const param = new URLSearchParams({ title: search.searchInput });
        const res = await mockApi.get(`/products/?${param.toString()}`);
        console.log("Searched Products Results" + res);
        setSearch((prevState) => ({ ...prevState, searchProducts: res.data, prevSearch: prevState.searchInput }));
        // setSearchProducts(res.data);
        // setPrevSearch(search);
      } catch (e) {
        setSearch((prevState) => ({
          ...prevState,
          searchProducts: [],
          prevSearch: prevState.searchInput,
          searchError: `No search result for "${prevState.searchInput}"`,
        }));
        // setSearchError(`No search result for ${search}`);
        // setSearchProducts([]);
        // setPrevSearch(search);
        console.log(e);
      }
    };
    //if searchInput empty("") does not search
    if (search.searchInput) {
      getSearchProducts();
    }
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.inputRecommendContainer}>
          <input
            className={styles.searchInput}
            type="text"
            id="searchBox"
            name="search"
            placeholder="Search Products"
            maxLength={100}
            value={search.searchInput}
            onChange={(e) => {
              setSearch((prevState) => ({ ...prevState, searchInput: e.target.value }));
              // setSearch(e.target.value);
            }}
            onBlur={() => {
              setTimeout(() => {
                setSearch((prevState) => ({ ...prevState, isHidden: true }));
                // setIsHidden(true);
              }, 200);
            }}
            onFocus={() => {
              setSearch((prevState) => ({ ...prevState, isHidden: false }));
              // setIsHidden(false);
            }}
          />
          {!search.isHidden && <RecommendList result={topFiveResult} />}
        </div>
        <button type="submit" className={styles.searchButton} onClick={handlerSearch}>
          Search
        </button>
      </div>

      {/* If mockApi returns error show No result found */}
      {search.searchError && (
        <>
          <h2 className={styles.titleName}>Search Results for "{search.prevSearch}"</h2>
          <p>{search.searchError}</p>
        </>
      )}
      {/* If mockApi returns data, display searchProducts */}
      {search.searchProducts.length > 0 && (
        <>
          <h2 className={styles.titleName}>Search Results for "{search.prevSearch}"</h2>
          <ProductList products={search.searchProducts} />
        </>
      )}
    </>
  );
}
export default SearchBar;
