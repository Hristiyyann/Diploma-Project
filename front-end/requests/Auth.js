import { appAxios } from './AxiosConfiguration';
import { saveItem, getItemValue, deleteItem } from '../Utils';

async function signIn(data, setRoles, setIsLoggedIn)
{
    const response = await appAxios.post('auth/signin', data);

    await saveItem('accessToken', response.data.accessToken);
    await saveItem('refreshToken', response.data.refreshToken);
    setRoles(response.data.roles);
    setIsLoggedIn(true);
}

async function signUp(data)
{
    const response = await appAxios.post('auth/signup', data);
    await saveItem('userId', response.data.userId);
    return true;
}

async function verification(smsCode, setRoles, setIsLoggedIn)
{
    const userId = await getItemValue('userId');
    const data = {userId, smsCode};
    const response = await appAxios.post('auth/verify', data);
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

async function logOut(setRoles, setIsLoggedIn)
{
    const accessToken = await getItemValue('accessToken');
    const refreshToken = await getItemValue('refreshToken');
    await appAxios.post('auth/logout', {accessToken, refreshToken});
    await deleteItem('accessToken');
    await deleteItem('refreshToken');
    setRoles('');
    setIsLoggedIn(false);
}
export { signIn, signUp, verification, resendVerificationCode, refresh, logOut };