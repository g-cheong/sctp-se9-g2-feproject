import { fakeStoreApi } from "../api/fakeStoreApi";

export const apiProductAction = {
  GET_ALL: "GET ALL",
  GET_ONE: "GET ONE",
  LIMIT: "LIMIT",
  SORT: "SORT",
  GET_ALL_CATEGORIES: "GET ALL CATEGORIES",
  GET_ONE_CATEGORY: "GET ONE CATEGORY",
  ADD_NEW_PRODUCT: "ADD NEW PRODUCT",
  UPDATE_PRODUCT: "UPDATE PRODUCT",
  DELETE_PRODUCT: "DELETE PRODUCT",
};

export const apiCartAction = {
  GET_ALL: "GET ALL",
  GET_ONE: "GET ONE",
  LIMIT: "LIMIT",
  SORT: "SORT",
  GET_IN_DATE_RANGE: "GET IN DATE RANGE",
  GET_USER_CART: "GET USER CART",
  ADD_NEW_CART: "ADD NEW CART",
  UPDATE_CART: "UPDATE CART",
  DELETE_CART: "DELETE CART",
};

export const apiUserAction = {
  GET_ALL: "GET ALL",
  GET_ONE: "GET ONE",
  LIMIT: "LIMIT",
  SORT: "SORT",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const apiLoginAction = {
  USER_LOGIN: "USER LOGIN",
};

export function ApiReducer(state, action) {
  const fakeStoreApiRequest = async () => {
    try {
      let response;
      switch (action.type) {
        case apiProductAction.GET_ALL:
          response = await fakeStoreApi.get("products");
          break;
        case apiProductAction.GET_ONE:
          response = await fakeStoreApi.get("products/1");
          break;
        case apiProductAction.LIMIT:
          response = await fakeStoreApi.get("products?limits=5");
          break;
        case apiProductAction.SORT:
          response = await fakeStoreApi.get("products?sort=desc");
          break;
        case apiProductAction.GET_ALL_CATEGORIES:
          response = await fakeStoreApi.get("products/categories");
          break;
        case apiProductAction.GET_ONE_CATEGORY:
          response = await fakeStoreApi.get("products/category/jewellery");
          break;
        case apiProductAction.ADD_NEW_PRODUCT:
          response = await fakeStoreApi.post("products");
          break;
        case apiProductAction.UPDATE_PRODUCT:
          response = await fakeStoreApi.put("products/7");
          break;
        case apiProductAction.DELETE_PRODUCT:
          response = await fakeStoreApi.delete("products/6");
          break;
        default:
          break;
      }
      console.log("response:", response);
      // return {...state, products: response.data};
    } catch (error) {
      console.log("ApiReducer error", error);
    } finally {
      console.log("fakeStoreApiRequest executed");
    }
  };

  fakeStoreApiRequest();
  return { ...state };
}
