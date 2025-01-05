import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function Navbar() {
  const user = useContext(UserContext);
  return (
    <header>
      <div className={styles.link}>
        <Link to="/" className={styles.link}>
          <span className={styles.logoText}>Shop</span>
        </Link>
      </div>
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
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
