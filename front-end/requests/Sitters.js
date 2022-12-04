import { appAxios } from './AxiosConfiguration';
import { getItemValue } from '../Utils';

async function checkCandidate()
{
    const accessToken = await getItemValue('accessToken');
    await appAxios.post('/sitters/check-candidate', { accessToken });
}

async function postCandidates(data)
{
    const accessToken = await getItemValue('accessToken');
    await appAxios.post('/sitters/candidates', {...data, accessToken})
}

export
{
    checkCandidate, postCandidates, 
}