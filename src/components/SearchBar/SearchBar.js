import { useState } from "react";
import { dummyProductData } from "../../dummydata/dummyProductData";
import styles from "./SearchBar.module.css";
import Fuse from "fuse.js";
import RecommendList from "../RecommendList/RecommendList";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [isHidden, setIsHidden] = useState(true);

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
  const result = fuse.search(search);
  const topFiveResult = result.slice(0, 5);
  console.log(result);
  console.log(topFiveResult);

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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            // onBlur={() => {
            //   setIsHidden(true);
            // }}
            onFocus={() => {
              setIsHidden(false);
            }}
          />
          {!isHidden && <RecommendList result={topFiveResult} />}
        </div>
        <button className={styles.searchButton}>Search</button>
      </div>
    </>
  );
}
export default SearchBar;
