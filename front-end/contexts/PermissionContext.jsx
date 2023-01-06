import React, { createContext, useState, useEffect, useContext } from 'react';
import { hasTokens } from '../Utils';
import { refresh } from '../requests/Auth';
import apiWrapper  from '../requests/ApiWrapper';
import { useLoading } from './LoadingContext';
import { useShowError } from './ErrorContext';
import { checkForErrors } from '../Utils'; 

const PermissionsContext = createContext();

function usePermissions() 
{
    return useContext(PermissionsContext);
}

function PermissionsContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [roles, setRoles] = useState();
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
 
    useEffect(() =>
    {
        async function checkTokens()
        {
            const refreshToken = await hasTokens();
            if(refreshToken != false) 
            {
                const response = await apiWrapper(setIsLoading, () => refresh())
            
                if(checkForErrors(response, setServerError, null))
                { 
                    setRoles(response.roles)
                    setIsLoggedIn(true); 
                    return;
                }
                setIsLoggedIn(false);
            }
            setIsLoggedIn(false);
        }
        checkTokens();
    }, []);

    return(
        <PermissionsContext.Provider value = {{isLoggedIn, setIsLoggedIn, roles, setRoles}}>
            {children}
        </PermissionsContext.Provider>
    )
};

export {PermissionsContextProvider, usePermissions};