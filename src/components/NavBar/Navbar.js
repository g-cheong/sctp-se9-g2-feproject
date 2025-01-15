import { Link, NavLink } from "react-router-dom";
import bluebag from "../../assets/bluebag.png";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function Navbar() {
  const user = useContext(UserContext);

  return (
    <header>
      <Link to="/" className={styles.link}>
        <img className={styles.bagImg} src={bluebag} alt="Mart logo" />
        <span className={styles.logoText}>Mart</span>
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
            </NavLink>
            <span>{user.cart.length ? <span className={styles.badge}>{user.cart.length}</span> : ""}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
