import axios from 'axios';
import { getItemValue } from '../Utils';

const authAxios = axios.create(
{
    //baseURL: 'http://172.20.10.2:8000/',
    baseURL: 'http://192.168.1.6:8000/',
});

const mainAxios = axios.create(
{
    baseURL: 'http://192.168.1.6:8000/',
});

async function apiWrapper(setIsLoading, apiFunction)
{
    const returnedObject = {};

    try
    {
        setIsLoading(true);
        returnedObject.data = await apiFunction();
        setIsLoading(false);
        returnedObject.success = true;
        return returnedObject;
    }
    catch(error)
    {
        setIsLoading(false);
        if(error.message == 'Access denied')
        {
            returnedObject.goToSignIn = true;
        }
        else if(error.message == 'You have to verify your telephone number')
        {
            returnedObject.goToVerification = true;
        }
        else
        {
            console.log(error);
        }
        return {...returnedObject, ...error};
    }
}

function returnResponse()
{
    return(
        function (response) 
        {
            return response;
        }
    )
}

function returnError()
{
    return(
        function (error) 
        {
            const errorObject = {};
            errorObject.status = error.response.status;
            errorObject.message = error.response.data.message;
            console.log(errorObject);
            return Promise.reject(errorObject);
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

export { authAxios, mainAxios, apiWrapper }