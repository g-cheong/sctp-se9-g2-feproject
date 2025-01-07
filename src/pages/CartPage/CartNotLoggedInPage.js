import { Link } from "react-router-dom";
import styles from "./CartPage.module.css"

export const CartNotLoggedInPage = () => {
    return (
        <div> 
            <p>
                You appear to not be logged in to a user account.
                <Link to={"/login"}> Login </Link>
            </p>
            <p>Or</p>
            <p> 
                Don't have an account? <Link to={"/register"}>Register</Link> 
            </p>
        </div>
    );
};