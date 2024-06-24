
const axios = require('axios');

require('dotenv').config()

const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co/query', // Alpha Vantage base URL
  timeout: 10000, // Set a timeout if needed
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add API key to every request if not already present
    if (!config.params) {
      config.params = {};
    }
    config.params.apikey = alphaVantageApiKey;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      console.error('Unauthorized error, redirecting or handling accordingly');
    }
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
