import { appAxios } from './AxiosConfiguration';
import { saveItem, getItemValue } from '../Utils';

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

export { signIn, signUp, verification, resendVerificationCode };