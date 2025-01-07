import { Link } from "react-router-dom";
import styles from "./CartPage.module.css"

export const CartNotLoggedInPage = () => {
    return (
        <div> 
            <p>
                Your cart appears empty...
                <Link to={"/"}> Shop now! </Link>
            </p>
        </div>
    );
};