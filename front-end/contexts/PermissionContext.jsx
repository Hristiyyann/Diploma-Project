import React, {createContext, useState, useEffect, useContext} from 'react';
import { hasTokens, getItemValue } from '../Utils';
import { useLoading } from './LoadingContext';

const PermissionsContext = createContext();

function usePermissions() 
{
    return useContext(PermissionsContext);
}

function PermissionsContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [roles, setRoles] = useState();
    const { setLoading } = useLoading();

    useEffect(() =>
    {
        async function checkTokens()
        {
            const result = await hasTokens();
            if(result == false) 
            {
                setIsLoggedIn(false); 
                return;
            }

            const refreshToken = await getItemValue('refreshToken');
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