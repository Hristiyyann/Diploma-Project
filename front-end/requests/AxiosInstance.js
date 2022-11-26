import axios from 'axios';

const appAxios = axios.create(
{
    baseURL: 'http://192.168.1.8:8000/',
});

async function apiWrapper(setIsLoading, apiFunction)
{
    try
    {
        setIsLoading(true);
        await apiFunction();
        setIsLoading(false);
        return true;
    }
    catch(error)
    {
        setIsLoading(false);
        console.log(error);
        return false;
    }
}

appAxios.interceptors.response.use(
function (response) 
{
    return response;
}, 
function (error) 
{
    console.log(error.response.data.message);
    return Promise.reject(error.response.data.message);
}); 

export { appAxios, apiWrapper }