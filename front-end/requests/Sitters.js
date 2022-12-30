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
    console.log(response);
    return response;
}

async function putSelfSchedule(data)
{
    const response = await mainAxios.put('/sitters/self/schedule', data);
    return response;
}

async function getServices()
{
    const response = await mainAxios.get('/sitters/services');
    return response;
}

export
{
    checkCandidate, postCandidates, getSelfServices, putServices, getSelfPets,
    putSelfPets, getServiceTimeRanges, putSelfSchedule, getServices
}