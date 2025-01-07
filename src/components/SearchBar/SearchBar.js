import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          id="searchBox"
          name="search"
          placeholder="Search Products"
          maxLength={100}
        />
        <button className={styles.searchButton}>Search</button>
      </div>
    </>
  );
  /* ; */
}
export default SearchBar;
