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

async function getSelfServices()
{
    const accessToken = await getItemValue('accessToken');
    const result  = await appAxios.post('/sitters/self/services', { accessToken });
    return result.data;
}

async function putServices(data)
{
    const accessToken = await getItemValue('accessToken');
    await appAxios.put('/sitters/self/services', { data, accessToken });
}

export
{
    checkCandidate, postCandidates, getSelfServices, putServices,
}