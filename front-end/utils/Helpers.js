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

function checkForErrors(response, setServerError, setFormError)
{
    if (response.success == true) return true;

    if (response.status === 400)
    {
        if(setFormError == null) return false;
        setFormError(response.message);
        return false;
    }
    
    if (response.status >= 403)
    {
        console.log(response.message);
        if (response.message != 'You have to verify your telephone number')
        {
            setServerError(
            {
                message: response.message,
                status: response.status
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