import React, {createContext, useState, useEffect, useContext} from 'react';
import { hasTokens, getItemValue } from '../Utils';
import { refresh } from '../requests/Auth';
import { apiWrapper } from '../requests/AxiosConfiguration';
import { useLoading } from './LoadingContext';

const PermissionsContext = createContext();

function usePermissions() 
{
    return useContext(PermissionsContext);
}

function PermissionsContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roles, setRoles] = useState();
    const { setIsLoading } = useLoading();

    useEffect(() =>
    {
        async function checkTokens()
        {
            const refreshToken = await hasTokens();
            if(refreshToken != false) 
            {
                const returnedObject = await apiWrapper(setIsLoading, () => refresh(refreshToken))
                if(returnedObject?.goToSignIn)
                {
                    setIsLoggedIn(false);
                    return;
                }
                setIsLoggedIn(true); 
            }
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