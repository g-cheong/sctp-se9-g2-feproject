import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import UserLayout from "./layout/UserLayout/UserLayout";
import { ApiReducer, apiProductAction } from "./reducers/ApiReducer";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(ApiReducer, {});

  const handlerGetProduct = () => {
    dispatch({type: apiProductAction.GET_ALL});
  };
  
  const handlerGetOneProduct = () => {
    dispatch({type: apiProductAction.GET_ONE});
  };

  return (
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
    //some comment
  );
}

export default App;
