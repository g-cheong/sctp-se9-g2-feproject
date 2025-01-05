import axios from "axios";

const FAKESTORE_API_BASE_URL = "https://fakestoreapi.com/";
export const fakeStoreApi = axios.create( {baseURL: FAKESTORE_API_BASE_URL} );