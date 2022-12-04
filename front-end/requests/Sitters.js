import { appAxios } from './AxiosConfiguration';
import { getItemValue } from '../Utils';

async function checkCandidate()
{
    const accessToken = await getItemValue('accessToken');
    await appAxios.post('/sitters/check-candidate', { accessToken });
}

export
{
    checkCandidate,
}