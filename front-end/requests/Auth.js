import { authAxios, mainAxios } from './AxiosConfiguration';
import { saveItem, getItemValue, deleteItem } from '../utils/Helpers';

async function signIn(data, setRoles, setIsLoggedIn)
{
    const response = await authAxios.post('auth/sign-in', data);
    await saveItem('accessToken', response.accessToken);
    await saveItem('refreshToken', response.refreshToken);
    setRoles(response.roles);
    setIsLoggedIn(true);
    return response;
}

async function signUp(data)
{
    const response = await authAxios.post('auth/sign-up', data);
    await saveItem('userId', response.userId);
    return response;
}

async function verification(code, setRoles, setIsLoggedIn)
{
    const userId = await getItemValue('userId');
    const data = { userId, code };
    const response = await authAxios.post('auth/verify', data);
    await saveItem('accessToken', response.accessToken);
    await saveItem('refreshToken', response.refreshToken);
    await deleteItem('userId');
    setRoles(response.roles);
    setIsLoggedIn(true);
    return response;
}

function resendVerificationCode()
{
    return authAxios.post('auth/resend');
}

async function refresh()
{
    const refreshToken =  await getItemValue('refreshToken');
    const response = await authAxios.post('auth/refresh', { refreshToken });
    await saveItem('accessToken', response.accessToken);
    await saveItem('refreshToken', response.refreshToken);
    return response;
}

function changePassword(data)
{
    return mainAxios.put('auth/change-password', data);
}

function forgetPassword(data)
{
    return authAxios.post('auth/forget-password', data);
}

function passwordRecovery(data)
{
    return authAxios.post('auth/password-recovery', data);
}

function checkCode(data)
{
    return authAxios.post('auth/check-code', data);
}

async function logOut(setRoles, setIsLoggedIn)
{
    const refreshToken = await getItemValue('refreshToken');
    const response = await mainAxios.post('auth/log-out', { refreshToken });
    await deleteItem('accessToken');
    await deleteItem('refreshToken');
    setRoles('');
    setIsLoggedIn(false);
    return response;
}

export 
{ 
    signIn, signUp, verification, resendVerificationCode, 
    refresh, changePassword, forgetPassword, passwordRecovery, 
    checkCode, logOut 
};