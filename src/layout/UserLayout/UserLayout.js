import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      {/* NavBar goes here */}
      <nav></nav>
      <main>
        <Outlet />
      </main>
      {/* Footer goes here */}
      <footer></footer>
    </>
  );
}
export default UserLayout;
