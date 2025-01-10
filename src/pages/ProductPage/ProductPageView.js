import styles from "./ProductPage.module.css";
import { PuffLoader } from "react-spinners";
import Button from "../../components/ProductCard/Button";

function ProductPageView({
  products,
  handlerMinus,
  count,
  handlerPlus,
  priceTotal,
  handlerAddToCart,
  isLoaded,
  addedItemsToCart,
  totalAddedToCart,
}) {
  return (
    <>
      {products === undefined ||
        (products.length <= 0 && (
          <div className={styles.spinnerStyle}>
            <PuffLoader color="#193993" size={170} speedMultiplier={2} />
          </div>
        ))}
      {products !== null && products !== undefined && isLoaded && (
        <div className={styles.productContainer} hidden={!isLoaded}>
          <div className={styles.productLeftSide}>
            <div className={styles.productLeftSideContainer}>
              <section className={styles.pictureSection}>
                <div className={styles.pictureContainer}>
                  <div className={styles.pictureRatio}>
                    <div className={styles.pictureResponsive}>
                      <div className={styles.pictureSize}>
                        <div className={styles.pictureDisplay}>
                          <img className={styles.pictureShow} src={products.image} alt="Store Product"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className={styles.productRightSide}>
            <div className={styles.productRightSideContainer}>
              <div className={styles.productDetails}></div>
              <div className={styles.productDetailsContainer}></div>
              <section className={styles.productTitleSection}>
                <h1>{products.title}</h1>
              </section>
              <hr className={styles.sectionSeparator}></hr>
              <div className={styles.productDetailsContainer}>
                <span>{products.description}</span>
              </div>
              <div>
                {addedItemsToCart !== undefined && addedItemsToCart > 0 && (
                  <div className={styles.addedToCart}>
                    <span>{addedItemsToCart} Item(s) Added to Cart!</span>
                  </div>
                )}
              </div>
              <div className={styles.productNumberContainer}>
                <span>Price: ${products.price}</span>
                <span>
                  <div className={styles.counter}>
                    Quantity: <Button label="➖" onClick={handlerMinus} />
                    <span className={styles.count}>{count}</span>
                    <Button label="➕" onClick={handlerPlus} />
                  </div>
                </span>
                <div className={styles.productTotalNumberContainer}>
                  <span>Total Price: {priceTotal}</span>
                  <span>
                    Total Quantity in Cart: {totalAddedToCart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
              </div>
              <div className={styles.productActionContainer}>
                <button className={styles.productActionButton} onClick={handlerAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ProductPageView;
