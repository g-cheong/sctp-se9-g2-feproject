import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function Navbar() {
  const user = useContext(UserContext);
  const totalQuantity =
    Array.isArray(user.cart) && user.cart.length > 0 ? user.cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header>
      <Link to="/" className={styles.link}>
        <h1 className={styles.logoText}>Mart 🛍️</h1>
        {/* <span className={styles.logoText}>Shop</span> */}
      </Link>

      <nav className="styles.navContainer">
        <ul>
          {user.isLoggedIn ? (
            <li>
              <Link className={styles.link} onClick={user.handlerLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/login">
                Login
              </NavLink>
            </li>
          )}
          <li>
            <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/cart">
              Cart
              {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
            </NavLink>
            <span>
            {user.cart.length 
              ? <span className={styles.badge}>{user.cart.length}</span>
              : ""
            }          
            </span>
            </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
