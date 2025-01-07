import axios from "axios";
//To avoid CORS error.
/*https://cors-anywhere.herokuapp.com/*/
const FAKESTORE_API_BASE_URL = "https://fakestoreapi.com";
export const fakeStoreApi = axios.create({ baseURL: FAKESTORE_API_BASE_URL });
