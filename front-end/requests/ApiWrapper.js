import { refresh } from './Auth';

async function apiWrapper(setIsLoading, apiFunction)
{
    let response = {};

    try
    {
        try
        {
            setIsLoading(true);
            response = await apiFunction();
        }
        catch (error)
        {
            if(error.status == 401)
            {
                await apiWrapper(setIsLoading, () => refresh());
                response = await apiFunction();
            }
            else
            {
                throw error;
            }
        }
    }
    catch(error)
    {
        response = error;
        setIsLoading(false);
        return response;
    }
    setIsLoading(false);
    return response;
}

export default apiWrapper;