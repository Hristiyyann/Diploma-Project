import * as SecureStore from "expo-secure-store";

async function saveItem(key, value) 
{
    await SecureStore.setItemAsync(key, value);
}

async function getItemValue(key) 
{
    let result = await SecureStore.getItemAsync(key);
    if (result) { return result; } 
    else { return null; }
}

async function deleteItem(key) 
{
    await SecureStore.deleteItemAsync(key);
}

async function hasTokens() 
{
    const accessToken = await getItemValue("accessToken");
    const refreshToken = await getItemValue("refreshToken");

    if (accessToken == null || refreshToken == null) 
    {
        return false;
    }
    return refreshToken;
}

function checkUserRolesFor(userRoles, rolesToCheck) 
{
    for (const role of userRoles) 
    {
        if (rolesToCheck.includes(role)) 
        {
            return true;
        }
    }
    return false;
}

function checkForErrors(returnedObject, setServerError, setFormError)
{
    if (returnedObject.data.success == true) return true;

    if (returnedObject.data.status === 400)
    {
        setFormError(returnedObject.data.message);
        return false;
    }
    
    if (returnedObject.data.status >= 403)
    {
        if (!returnedObject.data.message == 'You have to verify your telephone number')
        {
            setServerError(
            {
                message: returnedObject.data.message,
                status: returnedObject.data.status
            })

        }
        return false;
    }
}

export 
{ 
    saveItem, getItemValue, deleteItem, hasTokens, checkUserRolesFor,
    checkForErrors,
};