import { appAxios } from './AxiosConfiguration';
import { saveItem, getItemValue, deleteItem } from '../Utils';

async function signIn(data, setRoles, setIsLoggedIn)
{
    const response = await appAxios.post('auth/sign-in', data);

    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    setRoles(response.data.roles);
    setIsLoggedIn(true);
}

async function signUp(data)
{
    const response = await appAxios.post('auth/sign-up', data);
    await saveItem('userId', response.data.userId);
    return true;
}

async function verification(code, setRoles, setIsLoggedIn)
{
    const userId = await getItemValue('userId');
    const data = {userId, code};
    const response = await appAxios.post('auth/verify', data);
    await deleteItem('userId');
    setRoles(response.data.roles);
    setIsLoggedIn(true);
}

async function resendVerificationCode()
{
    await appAxios.post('auth/resend');
}

async function refresh(refreshToken, setRoles)
{
    const response = await appAxios.post('auth/refresh', { refreshToken });
    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    setRoles(response.data.roles);
}

async function changePassword(data)
{
    const accessToken = await getItemValue('accessToken');
    await appAxios.put('auth/change-password', {...data, accessToken});
}

async function forgetPassword(data)
{
    await appAxios.post('auth/forget-password', data);
}

async function passwordRecovery(data)
{
    await appAxios.post('auth/password-recovery', data);
}

async function checkCode(data)
{
    await appAxios.post('auth/check-code', data);
}

async function logOut(setRoles, setIsLoggedIn)
{
    const accessToken = await getItemValue('accessToken');
    const refreshToken = await getItemValue('refreshToken');
    await appAxios.post('auth/log-out', {accessToken, refreshToken});
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