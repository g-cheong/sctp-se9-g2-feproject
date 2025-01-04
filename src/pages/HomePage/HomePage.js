import { useContext } from "react";
import UserContext from "../../context/UserContext";

function HomePage() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>HomePage</h1>
      <p>{user.isLoggedIn ? "User is Logged In" : "User is Logged Out"}</p>
    </div>
  );
}
export default HomePage;
