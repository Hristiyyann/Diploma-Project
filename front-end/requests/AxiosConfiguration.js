import axios from 'axios';
import { getItemValue } from '../utils/Helpers';

const authAxios = axios.create(
{
    //baseURL: 'http://172.20.10.2:8000/',
    baseURL: 'http://192.168.1.5:8000/',
});

const mainAxios = axios.create(
{
    //baseURL: 'http://172.20.10.2:8000/',
    baseURL: 'http://192.168.1.5:8000/',
});

function returnResponse()
{
    return(
        function (response) 
        {
            return response.data;
        }
    )
}

function returnError()
{
    return(
        function (error) 
        {
            const response = {};
            response.status = +error.response.status;
            response.message = error.response.data.message;
            response.success = error.response.data.success;
            return Promise.reject(response);
        }
    )
} 

function applyAccessToken()
{
    return(
        async function (config) 
        {
            const accessToken = await getItemValue('accessToken');
            config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
            return config;
        }
    )
}

authAxios.interceptors.response.use(returnResponse(), returnError()); 
mainAxios.interceptors.request.use(applyAccessToken());
mainAxios.interceptors.response.use(returnResponse(), returnError());

export { authAxios, mainAxios }