import styles from './CartCard.module.css';
import trashIcon from '../../icons/trash.svg';

export const CartCard = ({product, handlerAddProduct, handlerSubtractProduct, handlerRemoveFromCart}) => {
    return (
        <div className={styles.cartList}>
            <div className={styles.cartCard}>
                <img className={styles.cartImage} src={product.image} alt={product.description}></img>
                <div className={styles.cartProductDetails}>
                    <h1>{product.title}</h1>
                    <h2>${product.price}</h2>
                    <h3>Quantity:
                        <button onClick={()=>handlerSubtractProduct(product.id)}>-</button>
                        {product.quantity}
                        <button onClick={()=>handlerAddProduct(product.id)}>+</button>
                    </h3>
                    <h3>Item Total: ${product.total}</h3>
                </div>
                <div>
                    <button 
                    className={styles.trashButton}
                    onClick={()=>handlerRemoveFromCart(product.id)}
                    >
                        <img src={trashIcon} alt="Remove from cart"/>
                    </button>
                </div>
            </div>
        </div>
    );
};