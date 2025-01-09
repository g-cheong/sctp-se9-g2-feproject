import styles from './CartCard.module.css';
import trashIcon from '../../icons/trash.svg';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

export const CartCard = ({product}) => {
    const userCtx = useContext(UserContext);

    return (
        <div className={styles.cartList}>
            <div className={styles.cartCard}>
                <img className={styles.cartImage} src={product.image} alt={product.description}></img>
                <div className={styles.cartProductDetails}>
                    <h1>{product.title}</h1>
                    <h2>${product.price}</h2>
                    <h3>Quantity:
                        <button onClick={userCtx.handlerSubtractProduct}>-</button>
                        {product.quantity}
                        <button onClick={userCtx.handlerAddProduct}>+</button>
                    </h3>
                    <h3>Item Total: ${product.total}</h3>
                </div>
                <div>
                    <button 
                    className={styles.trashButton}
                    onClick={userCtx.handlerRemoveFromCart}
                    >
                        <img src={trashIcon} alt="Remove from cart"/>
                    </button>
                </div>
            </div>
        </div>
    );
};