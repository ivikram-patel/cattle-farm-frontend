/* eslint-disable prettier/prettier */
import axios from 'axios';
// import { toast } from 'react-toastify';
import { API_BASE_URL } from 'store/constant';

// axios instance for making requests 
const axiosInstance = axios.create();

// axios instance base url
axiosInstance.defaults.baseURL = API_BASE_URL;

// request interceptor 
axiosInstance.interceptors.request.use((config) => {
    //config.headers['Authorization'] = localStorage.getItem('token');
    return config;
});

// response interceptor
let counter = 0;
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        console.log(error, error.response.status);

        counter++;
        //Connections refuse 
        if (!error.status) {
            // console.log('Netword error ' + counter)
            //If error message contain 404 not found ,than no need to re-process
            if (error.message.includes('404')) {

                return Promise.reject({ 'status': 404, 'statusText': 'ERROR', 'message': '404 Not found!' });
            } else if (counter == 0) { // @todo:: change the condition to 5 once understand these code
                return axiosInstance.request(error.config);

            } else {
                counter = 0;
                return Promise.reject({
                    'status': 503, 'statusText': 'ERROR',
                    'message': 'The requested server is unavailable.!'
                });
            }
        }

        //Re-Process only get request
        else if (error.response.status === 429 && error.response.config.method === 'get') {

            if (counter == 0) return axiosInstance.request(error.config);

            else counter = 0

        } else if (error.response.status === 401) {
            // return axiosInstance.request(error.config);

            // TODO:: set message and remove local storage item window.location to home page

            // window.location('')

            // naviagte() useNavigation() hooks
            // localStorage.clear()

            return Promise.reject({ 'status': 401, 'statusText': 'ERROR', 'message': 'Unauthorized access' });
        }

        /* if (error.response.status === 401 && originalRequest.url ===
            'http://dummydomain.com/auth/token') { // Added this condition to avoid infinite loop 
            // Redirect to any unauthorised route to avoid infinite loop...
            return Promise.reject(error);
        } */

        return Promise.reject(error);
    });


export default axiosInstance;