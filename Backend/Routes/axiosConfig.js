const axios = require('axios');

require('dotenv').config()

const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co/query', 
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    
    if (!config.params) {
      config.params = {};
    }
    config.params.apikey = alphaVantageApiKey;
    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
  
    if (error.response && error.response.status === 401) {
      
      console.error('Unauthorized error, redirecting or handling accordingly');
    }
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
