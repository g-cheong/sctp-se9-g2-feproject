import styles from "./CartBar.module.css";

export function CartBar({cart, handlerCheckout}) {
    return (
        <section className={styles.totalSection}>
            <button className={styles.checkoutButton} onClick={() => { handlerCheckout(); }}>Checkout</button>
            <h4>
                Cart Total: $
                {(cart.reduce((acc, product) => {
                return acc + product.total;
                }, 0)).toFixed(2)}
            </h4>
        </section>
    );
};