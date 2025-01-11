import { Link } from "react-router-dom";

import { PuffLoader } from "react-spinners";
import styles from "./HomePage.module.css";
import CategoryList from "../../components/CategoryList/CategoryList";

function HomePageView({ selectedProducts }) {
  return (
    <>
      {selectedProducts === undefined ||
        (selectedProducts.length <= 0 && (
          <div className={styles.spinnerStyle}>
            <PuffLoader color="#193993" size={170} speedMultiplier={2} />
          </div>
        ))}
      {selectedProducts !== undefined && selectedProducts.length > 0 && (
        <section className={styles.sectionStyle}>
          <section>
            <div>
              <div className={styles.headerStyle}>
                <section className={styles.sectionStyle}>
                  <div className={styles.titleStyle}>
                    <h2 className={styles.titleName}>Popular</h2>
                  </div>
                </section>
              </div>
              <ul className={styles.listStyle}>
                {selectedProducts.map((product) => (
                  <li className={styles.listItemStyle} key={product.id}>
                    <div className={styles.listItemDetails}>
                      <Link to={`/product/${product.id}`} className={styles.listItemLink}>
                        <img className={styles.listItemImage} loading="lazy" src={product.image} alt="Store Product" />
                        <div className={styles.listItemPrice}>${product.price.toFixed(2)}</div>
                        <span className={styles.listItemTitle}>
                          <h3>{product.title}</h3>
                        </span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      )}
      <CategoryList />
    </>
  );
}
export default HomePageView;
