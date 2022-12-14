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
            if(error.message == 'Access denied')
            {
                returnedObject.goToSignIn = true;
            }
            else if(error.status == '401')
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
        if(error.message == 'You have to verify your telephone number')
        {
            returnedObject.goToVerification = true;
        }
        else
        {
            console.log(error);
        }
        setIsLoading(false);
        return {...returnedObject, ...error};
    }
    setIsLoading(false);
    return returnedObject;
}

export default apiWrapper;