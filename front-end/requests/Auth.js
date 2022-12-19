import { authAxios, mainAxios } from './AxiosConfiguration';
import { saveItem, getItemValue, deleteItem } from '../Utils';

async function signIn(data, setRoles, setIsLoggedIn)
{
    const response = await authAxios.post('auth/sign-in', data);
    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    setRoles(response.data.roles);
    setIsLoggedIn(true);
}

async function signUp(data)
{
    const response = await authAxios.post('auth/sign-up', data);
    await saveItem('userId', response.data.userId);
}

async function verification(code, setRoles, setIsLoggedIn)
{
    const userId = await getItemValue('userId');
    const data = {userId, code};
    const response = await authAxios.post('auth/verify', data);
    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    await deleteItem('userId');
    setRoles(response.data.roles);
    setIsLoggedIn(true);
}

async function resendVerificationCode()
{
    await authAxios.post('auth/resend');
}

async function refresh()
{
    const refreshToken =  await getItemValue('refreshToken');
    const response = await authAxios.post('auth/refresh', { refreshToken });
    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    return response.data;
}

async function changePassword(data)
{
    await mainAxios.put('auth/change-password', {...data });
}

async function forgetPassword(data)
{
    await authAxios.post('auth/forget-password', data);
}

async function passwordRecovery(data)
{
    await authAxios.post('auth/password-recovery', data);
}

async function checkCode(data)
{
    await authAxios.post('auth/check-code', data);
}

async function logOut(setRoles, setIsLoggedIn)
{
    const refreshToken = await getItemValue('refreshToken');
    await mainAxios.post('auth/log-out', { refreshToken });
    await deleteItem('accessToken');
    await deleteItem('refreshToken');
    setRoles('');
    setIsLoggedIn(false);
}

export 
{ 
    signIn, signUp, verification, resendVerificationCode, 
    refresh, changePassword, forgetPassword, passwordRecovery, 
    checkCode, logOut 
};