import { appAxios } from './AxiosInstance';
import { saveItem } from '../Utils';

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

export { signIn, signUp };