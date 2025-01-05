import axios from "axios";

const MOCK_API_BASE_URL = "https://62ba9b04573ca8f8328762ca.mockapi.io'";
export const mockAPI = axios.create( {baseUrl: MOCK_API_BASE_URL} );

