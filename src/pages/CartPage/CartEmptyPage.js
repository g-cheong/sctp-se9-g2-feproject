import { Link } from "react-router-dom";
import styles from "./CartEmptyPage.module.css"

export const CartEmptyPage = () => {
    return (
        <div> 
            <p>
                Your cart appears to be empty...
                <Link to={"/"}> Shop now! </Link>
            </p>
        </div>
    );
};