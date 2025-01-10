import { Link } from "react-router-dom";
import styles from "./RecommendList.module.css";

function RecommendList({ result }) {
  return (
    <div className={styles.recommendList}>
      {result.map((product) => (
        <div key={product.item.id} className={styles.recommendCard}>
          <img className={styles.image} loading="lazy" src={product.item.image} alt="Store Product" />
          <div className={styles.description}>
            <Link to={`/product/${product.item.id}`}>
              <p className={styles.title}>{product.item.title}</p>
            </Link>
            <p className={styles.category}>{product.item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default RecommendList;
