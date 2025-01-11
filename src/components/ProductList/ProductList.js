import { displayCost } from "../../utils/displayCost";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div className={styles.productCard} key={product.id}>
          <img className={styles.image} loading="lazy" src={product.image} alt="Store Product" />
          <div className={styles.productDescContainer}>
            <p className={styles.title}>{product.title}</p>
            <p className={styles.price}>{displayCost(product.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductList;
