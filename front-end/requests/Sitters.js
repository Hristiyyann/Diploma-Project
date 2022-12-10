import { mainAxios } from './AxiosConfiguration';

async function checkCandidate()
{
    await authAxios.post('/sitters/check-candidate');
}

async function postCandidates(data)
{
    await mainAxios.post('/sitters/candidates', { ...data })
}

async function getSelfServices()
{
    const result  = await mainAxios.get('/sitters/self/services');
    return result.data;
}

async function putServices(data)
{
    await mainAxios.put('/sitters/self/services', { data });
}

async function getSelfPets()
{
    const result  = await mainAxios.get('/sitters/self/pets');
    return result.data;
}

async function putSelfPets(data)
{
    await mainAxios.put('/sitters/self/pets', { data });
}

export
{
    checkCandidate, postCandidates, getSelfServices, putServices, getSelfPets,
    putSelfPets,
}