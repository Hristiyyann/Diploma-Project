import * as SecureStore from "expo-secure-store";

async function saveItem(key, value) 
{
    await SecureStore.setItemAsync(key, value);
    console.log("successfully");
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
    let success;
    console.log(returnedObject);

    if
    (
        returnedObject.data.success == true || 
        returnedObject.message == 'You have to verify your telephone number'
    )
    {
        success = true;
    }
    else if
    (
        returnedObject.message == 'Access denied' ||
        returnedObject.status >= 404 ||
        returnedObject.status >= 500
    )
    {
        success = false;
        setServerError(returnedObject.message)
    }
    else
    {
        success = false;
        if(setFormError != null)
        {
            console.log('vleze');
            setFormError(returnedObject.data.message);
        }
        else
        {
            console.log(' ---- ');
        }
    }
    return success;
}

export 
{ 
    saveItem, getItemValue, deleteItem, hasTokens, checkUserRolesFor,
    checkForErrors,
};