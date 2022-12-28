import { mainAxios } from './AxiosConfiguration';

async function checkCandidate()
{
    const response = await mainAxios.get('/sitters/check-candidate');
    return response;
}

async function postCandidates(data)
{
    const response = await mainAxios.post('/sitters/candidates', data);
    return response;
}

async function getSelfServices()
{
    const response = await mainAxios.get('/sitters/self/services');
    return response;
}

async function putServices(data)
{
    const response = await mainAxios.put('/sitters/self/services', { data });
    return response;
}

async function getSelfPets()
{
    const response =  await mainAxios.get('/sitters/self/pets');
    return response;
}

async function putSelfPets(data)
{
    const response = await mainAxios.put('/sitters/self/pets', { data });
    return response;
}

async function getServiceTimeRanges()
{
    const response = await mainAxios.get('/sitters/services/time-ranges');
    return response;
}

export
{
    checkCandidate, postCandidates, getSelfServices, putServices, getSelfPets,
    putSelfPets, getServiceTimeRanges, 
}