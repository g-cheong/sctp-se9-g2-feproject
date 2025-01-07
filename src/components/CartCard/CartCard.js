import styles from './CartCard.module.css';

export const CartCard = ({product}) => {
    return (
        <div className={styles.cartList}>
            <div className={styles.cartCard}>
                <img className={styles.cartImage} src={product.image} alt={product.description}></img>
                <div className={styles.cartProductDetails}>
                    <h1>{product.title}</h1>
                    <h2>${product.price}</h2>
                    <h3>Quantity:{product.quantity}</h3>
                    <h3>Price: ${product.price}</h3>
                    <h3>Item Total: ${product.total}</h3>
                </div>
            </div>
        </div>
    );
};