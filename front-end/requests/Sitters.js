import { mainAxios } from './AxiosConfiguration';

function checkCandidate()
{
    return mainAxios.get('/sitters/check-candidate');
}

function postCandidates(data)
{
    return mainAxios.post('/sitters/candidates', data);
}

function getSelfServices()
{
    return mainAxios.get('/sitters/self/services');
}

function putServices(data)
{
    return mainAxios.put('/sitters/self/services', { data });
}

function getSelfPets()
{
    return mainAxios.get('/sitters/self/pets');
}

function putSelfPets(data)
{
    return mainAxios.put('/sitters/self/pets', { data });
}

function getServiceTimeRanges()
{
    return mainAxios.get('/sitters/services/time-ranges');
}

function putSelfSchedule(data)
{
    return mainAxios.put('/sitters/self/schedule', data);
}

function getSelfSchedule(page)
{
    return mainAxios.get(`/sitters/self/schedule?page=${page}`);
}

function getServices()
{
    return mainAxios.get('/sitters/services');
}

export
{
    checkCandidate, postCandidates, getSelfServices, putServices, getSelfPets,
    putSelfPets, getServiceTimeRanges, putSelfSchedule, getSelfSchedule, 
    getServices
}