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
            setIsLoading(false);
        }
        catch (error)
        {
            if(error.status == '401')
            {
                await apiWrapper(setIsLoading, () => refresh());
                returnedObject.data = await apiFunction();
                console.log(returnedObject.data);
            }
            else
            {
                throw error;
            }
        }
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
    return returnedObject;
}

export default apiWrapper;