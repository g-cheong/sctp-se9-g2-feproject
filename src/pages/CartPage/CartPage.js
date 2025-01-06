/*
TODO: Gabriel
If user is not login, navigate to loginpage with message "Please login to view cart".
use <Navigate/>

If user is login and no item in cart, display CartEmpty component.
use !user.isLoggedIn return <CartEmpty/>

If user is login display items in CartCard component from user.cart useContext.
*/

function CartPage() {
  const exampleCart = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
    quantity: 5,
    total: 50,
  };
  return <div>CartPage</div>;
}
export default CartPage;
