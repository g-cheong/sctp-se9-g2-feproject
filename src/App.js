import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import UserLayout from "./layout/UserLayout/UserLayout";
<<<<<<< HEAD
import { ApiReducer, apiProductAction } from "./reducers/ApiReducer";
import { useReducer } from "react";
=======
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
>>>>>>> 7b8753e183963d6ac83fb2a3226741a942955757

function App() {
  const [state, dispatch] = useReducer(ApiReducer, {});

  const handlerGetProduct = () => {
    dispatch({type: apiProductAction.GET_ALL});
  };
  
  const handlerGetOneProduct = () => {
    dispatch({type: apiProductAction.GET_ONE});
  };

  return (
<<<<<<< HEAD
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <button onClick={handlerGetProduct}>Get All Products</button>
        <button onClick={handlerGetOneProduct}>Get One Product</button>
    </div>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> 7b8753e183963d6ac83fb2a3226741a942955757
    //some comment
  );
}

export default App;
