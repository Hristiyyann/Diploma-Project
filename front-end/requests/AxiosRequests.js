import axios from 'axios';

const appAxios = axios.create(
{
    baseURL: 'http://192.168.1.8:8000/',
});

async function signIn(emailAddress, password)  
{
    try
    {
        const response = await appAxios.post('auth/signin',
        {
            emailAddress, 
            password
        });
        console.log(response.data);
    }
    catch (error)
    {
        console.log(error);
    }
}

async function refreshToken()
{
    try
    {
        
        const response = await appAxios.post('auth/refresh');
        console.log(response.data);
    }
    catch(error)
    {
        console.log(error);
    }    
}

export default signIn;