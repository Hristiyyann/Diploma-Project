import axios from 'axios';

const appAxios = axios.create(
{
    baseURL: 'http://192.168.1.8:8000/',
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

appAxios.interceptors.response.use(
function (response) 
{
    return response;
}, 
function (error) 
{
    const errorObject = {};
    errorObject.status = error.response.status;
    errorObject.message = error.response.data.message;
    console.log(errorObject);
    return Promise.reject(errorObject);
}); 

export { appAxios, apiWrapper }