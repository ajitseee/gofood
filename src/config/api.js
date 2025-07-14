// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.vercel.app' // Will update this after backend deployment
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/createuser`,
  FOOD_DATA: `${API_BASE_URL}/api/auth/foodData`,
  ORDER_DATA: `${API_BASE_URL}/api/auth/orderData`,
  MY_ORDER_DATA: `${API_BASE_URL}/api/auth/myOrderData`,
  GET_LOCATION: `${API_BASE_URL}/api/auth/getlocation`
};

export default API_BASE_URL;
