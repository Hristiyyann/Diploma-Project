import { refresh } from './Auth';

async function apiWrapper(setIsLoading, apiFunction)
{
    const returnedObject = {};

    try
    {
        try
        {
            setIsLoading(true);
            returnedObject.data = await apiFunction();
        }
        catch (error)
        {
            if(error.status == 401)
            {
                await apiWrapper(setIsLoading, () => refresh());
                returnedObject.data = await apiFunction();
            }
            else
            {
                throw error;
            }
        }
    }
    catch(error)
    {
        returnedObject.data = error;
        setIsLoading(false);
        return returnedObject;
    }
    setIsLoading(false);
    return returnedObject;
}

export default apiWrapper;