import { appAxios } from './AxiosInstance';
import { saveItem } from '../Utils';

async function signIn(data)
{
    try
    {
        const response = await appAxios.post('auth/signin', data);
        await saveItem('accessToken', response.data.accessToken);
        await saveItem('refreshToken', response.data.refreshToken);
        const roles = response.data.roles;
        return {roles};
    }
    catch (error)
    {
        return {error};
    }
}

export { signIn };