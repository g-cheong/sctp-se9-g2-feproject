import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import styles from "./UserLayout.module.css";

function UserLayout() {
  return (
    <>
      {/* NavBar goes here */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Footer goes here */}
      <footer></footer>
    </>
  );
}
export default UserLayout;
